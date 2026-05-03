import { Component, DestroyRef, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SharedService } from '../../../../shared/services/shared.service';
import { DiplomasService } from '../../services/diplomas.service';
import { Exam } from '../../models/exam.models';
import { ExamCard } from '../../../../shared/components/exam-card/exam-card';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-exams',
  standalone: true,
  imports: [ExamCard, LoadingComponent, EmptyStateComponent],
  templateUrl: './exams.html',
  styleUrl: './exams.scss',
})
export class Exams {
  private readonly destroyRef = inject(DestroyRef);
  private sharedService = inject(SharedService);
  private route = inject(ActivatedRoute);
  private diplomasService = inject(DiplomasService);

  exams = signal<Exam[]>([]);
  loading = signal(false);
  diplomaId = signal('');
  examsParams = {
    page: 1,
    limit: 12,
  };

  ngOnInit(): void {
    this.diplomaId.set(this.route.snapshot.paramMap.get('id') ?? '');
    this.getExamsByDiplomaId();
  }


  setHeaderData(pageTitle:string): void {
    this.sharedService.breadcrumbData
    .set([
      { label: 'Diplomas', routerLink: '/diplomas' },
      { label: pageTitle },
      { label: 'Exams' }
      ]);
    this.sharedService.headerTitle.set(pageTitle);
    this.sharedService.headerIcon.set('pi pi-book');
    this.sharedService.headerBacklink.set('/diplomas');
  }

  getExamsByDiplomaId(): void {
    const currentDiplomaId = this.diplomaId();
    if (!currentDiplomaId) {
      this.exams.set([]);
      return;
    }

    this.loading.set(true);
    this.diplomasService
      .getExamsByDiplomaId(currentDiplomaId, this.examsParams)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.exams.set(response.payload.data);
          this.setHeaderData(response?.payload?.data[0]?.diploma?.title)
          this.loading.set(false);
        },
        error: () => {
          this.exams.set([]);
          this.loading.set(false);
        },
      });
  }
}
