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
