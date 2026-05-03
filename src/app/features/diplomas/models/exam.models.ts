import { PaginationMetadata } from './diploma.models';

export interface ExamDiplomaSummary {
  id: string;
  title: string;
}

export interface Exam {
  id: string;
  title: string;
  description: string;
  image: string;
  duration: number;
  diplomaId: string;
  immutable: boolean;
  createdAt: string;
  updatedAt: string;
  diploma: ExamDiplomaSummary;
  questionsCount: number;
}

export interface ExamsByDiplomaPayload {
  data: Exam[];
  metadata: PaginationMetadata;
}

export interface GetExamsByDiplomaIdResponse {
  status: boolean;
  code: number;
  payload: ExamsByDiplomaPayload;
}

/** Full diploma info nested under exam (GET /exams/:examId). */
export interface ExamDiplomaNested {
  id: string;
  title: string;
  description: string;
  image: string;
}

/** Exam detail returned by GET /exams/:examId. */
export interface ExamDetail {
  id: string;
  title: string;
  description: string;
  image: string;
  duration: number;
  diplomaId: string;
  immutable: boolean;
  createdAt: string;
  updatedAt: string;
  diploma: ExamDiplomaNested;
  questionsCount: number;
}

export interface ExamDetailsPayload {
  exam: ExamDetail;
}

export interface GetExamDetailsResponse {
  status: boolean;
  code: number;
  payload: ExamDetailsPayload;
}
