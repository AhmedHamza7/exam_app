export interface QuestionAnswer {
  id: string;
  text: string;
}

export interface ExamQuestion {
  id: string;
  text: string;
  examId: string;
  immutable: boolean;
  createdAt: string;
  updatedAt: string;
  answers: QuestionAnswer[];
}

export interface QuestionsPayload {
  questions: ExamQuestion[];
}

export interface GetQuestionsByExamIdResponse {
  status: boolean;
  code: number;
  payload: QuestionsPayload;
}
