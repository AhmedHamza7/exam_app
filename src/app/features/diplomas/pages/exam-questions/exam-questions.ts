import {
  Component,
  computed,
  DestroyRef,
  inject,
  model,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { RadioButton } from 'primeng/radiobutton';
import { StepperModule } from 'primeng/stepper';
import { forkJoin } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { DiplomasService } from '../../services/diplomas.service';
import { ExamDetail } from '../../models/exam.models';
import { ExamQuestion } from '../../models/question.models';
import { SubmitExamPayload } from '../../models/submission.models';
import { SharedService } from '../../../../shared/services/shared.service';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-exam-questions',
  standalone: true,
  imports: [
    StepperModule,
    ButtonModule,
    ProgressBarModule,
    RadioButton,
    FormsModule,
    LoadingComponent,
    EmptyStateComponent,
  ],
  templateUrl: './exam-questions.html',
  styleUrl: './exam-questions.scss',
})
export class ExamQuestions implements OnInit, OnDestroy {
  private readonly destroyRef = inject(DestroyRef);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly diplomasService = inject(DiplomasService);
  private readonly sharedService = inject(SharedService);

  examId = '';
  exam = signal<ExamDetail | null>(null);
  questions = signal<ExamQuestion[]>([]);
  loading = signal(true);
  submitting = signal(false);

  submission = signal<SubmitExamPayload | null>(null);
  startedAt = '';

  /** questionId -> answerId */
  selectedAnswers: Record<string, string> = {};

  activeStep = model<number>(1);

  remainingSeconds = signal(0);
  private totalSeconds = 0;
  private timerId: ReturnType<typeof setInterval> | null = null;

  progressPercent = computed(() => {
    const ex = this.exam();
    const total = ex?.questionsCount ?? this.questions().length;
    if (!total) {
      return 0;
    }
    if (this.submission()) {
      return 100;
    }
    const step = this.activeStep() ?? 1;
    return Math.min(100, (step / total) * 100);
  });

  timerRingPercent = computed(() => {
    if (!this.totalSeconds) {
      return 0;
    }
    return (this.remainingSeconds() / this.totalSeconds) * 100;
  });

  resultsStepValue = computed(() => this.questions().length + 1);

  ngOnInit(): void {
    this.examId = this.route.snapshot.paramMap.get('id') ?? '';
    if (!this.examId) {
      this.loading.set(false);
      return;
    }

    forkJoin({
      exam: this.diplomasService.getExamDetails(this.examId),
      questions: this.diplomasService.getQuestionsByExamId(this.examId),
    })
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.loading.set(false)),
      )
      .subscribe({
        next: ({ exam, questions }) => {
          const ex = exam.payload.exam;
          this.exam.set(ex);
          this.questions.set(questions.payload.questions);
          this.startedAt = new Date().toISOString();
          this.setHeader(ex);
          this.totalSeconds = Math.max(1, ex.duration * 60);
          this.remainingSeconds.set(this.totalSeconds);
          this.startTimer();
        },
        error: () => {
          this.exam.set(null);
          this.questions.set([]);
        },
      });
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }

  private setHeader(ex: ExamDetail): void {
    const diplomaId = ex.diploma.id;
    this.sharedService.breadcrumbData.set([
      { label: 'Diplomas', routerLink: '/diplomas' },
      { label: 'Exams', routerLink: `/diplomas/exams/${diplomaId}` },
      { label: ex.title },
    ]);
    this.sharedService.headerTitle.set(ex.title);
    this.sharedService.headerIcon.set('pi pi-question-circle');
    this.sharedService.headerBacklink.set(`/diplomas/exams/${diplomaId}`);
  }

  private startTimer(): void {
    this.stopTimer();
    this.timerId = setInterval(() => {
      this.remainingSeconds.update((s) => {
        if (s <= 1) {
          this.stopTimer();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
  }

  private stopTimer(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  formatMmSs(totalSeconds: number): string {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  previousStep(): void {
    const cur = this.activeStep() ?? 1;
    if (cur <= 1) {
      return;
    }
    this.activeStep.set(cur - 1);
  }

  nextOrFinish(): void {
    if (this.submitting()) {
      return;
    }
    const n = this.questions().length;
    const cur = this.activeStep() ?? 1;
    if (cur < n) {
      this.activeStep.set(cur + 1);
      return;
    }
    if (cur === n) {
      this.finishExam();
    }
  }

  private finishExam(): void {
    const exam = this.exam();
    if (!exam || this.submitting()) {
      return;
    }

    const answers = this.questions().map((q) => ({
      questionId: q.id,
      answerId: this.selectedAnswers[q.id] ?? '',
    }));

    this.submitting.set(true);
    this.diplomasService
      .submitExamAnswers({
        examId: exam.id,
        answers,
        startedAt: this.startedAt,
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.submission.set(res.payload);
          this.stopTimer();
          this.submitting.set(false);
          queueMicrotask(() => this.activeStep.set(this.resultsStepValue()));
        },
        error: () => {
          this.submitting.set(false);
        },
      });
  }

  restart(): void {
    this.submission.set(null);
    this.selectedAnswers = {};
    this.activeStep.set(1);
    const ex = this.exam();
    if (ex) {
      this.totalSeconds = Math.max(1, ex.duration * 60);
      this.remainingSeconds.set(this.totalSeconds);
      this.startedAt = new Date().toISOString();
      this.startTimer();
    }
  }

  explore(): void {
    void this.router.navigate(['/diplomas']);
  }

  scoreKnobBackground(result: SubmitExamPayload): string {
    const s = result.submission;
    const t = s.totalQuestions || 1;
    const correctPct = (s.correctAnswers / t) * 100;
    const wrongPct = (s.wrongAnswers / t) * 100;
    const splitWrong = correctPct + wrongPct;
    return `conic-gradient(#22c55e 0% ${correctPct}%, #ef4444 ${correctPct}% ${splitWrong}%, #d1d5db ${splitWrong}% 100%)`;
  }

  answerLabel(payload: unknown): string {
    if (payload && typeof payload === 'object' && 'text' in payload) {
      const text = (payload as { text?: unknown }).text;
      if (text != null) {
        return String(text);
      }
    }
    return '';
  }
}
