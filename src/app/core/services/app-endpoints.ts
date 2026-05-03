const BASE_URL = 'https://exam-app.elevate-bootcamp.cloud/api'

export class DiplomasEndPoints {
    static readonly GET_DIPLOMAS = `${BASE_URL}/diplomas`;
    static readonly GET_EXAMS = `${BASE_URL}/exams`;
    static GET_EXAM_BY_ID(examId: string): string {
        return `${BASE_URL}/exams/${examId}`;
    }
    static GET_QUESTIONS_BY_EXAM_ID(examId: string): string {
        return `${BASE_URL}/questions/exam/${examId}`;
    }

    static readonly SUBMIT_EXAM_ANSWERS = `${BASE_URL}/submissions`;
}