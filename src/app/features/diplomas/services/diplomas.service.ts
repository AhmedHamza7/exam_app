import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DiplomasEndPoints } from '../../../core/services/app-endpoints';
import { GetDiplomasResponse } from '../models/diploma.models';
import { GetExamDetailsResponse, GetExamsByDiplomaIdResponse } from '../models/exam.models';
import { GetQuestionsByExamIdResponse } from '../models/question.models';
import {
  SubmitExamAnswersResponse,
  SubmitExamRequestBody,
} from '../models/submission.models';

@Injectable({
  providedIn: 'root',
})
export class DiplomasService {
  private readonly http = inject(HttpClient);

  getDiplomas(diplomasParams: { page: number; limit: number }): Observable<GetDiplomasResponse> {
    return this.http.get<GetDiplomasResponse>(DiplomasEndPoints.GET_DIPLOMAS, { params: diplomasParams });
  }

  getExamsByDiplomaId(
    diplomaId: string,
    examsParams: { page: number; limit: number },
  ): Observable<GetExamsByDiplomaIdResponse> {
    return this.http.get<GetExamsByDiplomaIdResponse>(
      DiplomasEndPoints.GET_EXAMS,
      { params: { diplomaId, ...examsParams } },
    );
  }

  getExamDetails(examId: string): Observable<GetExamDetailsResponse> {
    return this.http.get<GetExamDetailsResponse>(DiplomasEndPoints.GET_EXAM_BY_ID(examId));
  }

  getQuestionsByExamId(examId: string): Observable<GetQuestionsByExamIdResponse> {
    return this.http.get<GetQuestionsByExamIdResponse>(
      DiplomasEndPoints.GET_QUESTIONS_BY_EXAM_ID(examId),
    );
  }

  submitExamAnswers(body: SubmitExamRequestBody): Observable<SubmitExamAnswersResponse> {
    return this.http.post<SubmitExamAnswersResponse>(DiplomasEndPoints.SUBMIT_EXAM_ANSWERS, body);
  }
}
