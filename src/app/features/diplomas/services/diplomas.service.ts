import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DiplomasEndPoints } from '../../../core/services/app-endpoints';
import { GetDiplomasResponse } from '../models/diploma.models';

@Injectable({
  providedIn: 'root',
})
export class DiplomasService {
  private readonly http = inject(HttpClient);

  getDiplomas(diplomasParams: {page:number, limit:number}): Observable<GetDiplomasResponse> {
    return this.http.get<GetDiplomasResponse>(DiplomasEndPoints.GET_DIPLOMAS, { params: diplomasParams });
  }
}
