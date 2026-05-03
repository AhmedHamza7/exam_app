export interface SubmitExamAnswerItem {
  questionId: string;
  answerId: string;
}

export interface SubmitExamRequestBody {
  examId: string;
  answers: SubmitExamAnswerItem[];
  startedAt: string;
}

export interface SubmissionExamSummary {
  id: string;
  title: string;
  duration: number;
}

export interface ExamSubmission {
  id: string;
  userId: string;
  examId: string;
  examTitle: string;
  exam: SubmissionExamSummary;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  startedAt: string;
  submittedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface AnswerPayload {
  id?: string;
  text?: string;
  [key: string]: unknown;
}

export interface QuestionAnalyticsItem {
  questionId: string;
  questionText: string;
  selectedAnswer: AnswerPayload | Record<string, unknown>;
  isCorrect: boolean;
  correctAnswer: AnswerPayload | Record<string, unknown>;
}

export interface SubmitExamPayload {
  submission: ExamSubmission;
  analytics: QuestionAnalyticsItem[];
}

export interface SubmitExamAnswersResponse {
  status: boolean;
  code: number;
  payload: SubmitExamPayload;
}
