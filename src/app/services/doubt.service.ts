import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment.prod';

import { Doubt } from '../model/doubt';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoubtService {

  private readonly baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

  takeDoubt(data: Doubt): Observable<Doubt> {
    const token = localStorage.getItem('accessToken') || '';
    const headers = { Authorization: `Bearer ${token}` };

    return this.httpClient.post<Doubt>(`${this.baseUrl}/api/doubt/`, data, { headers });
  }
}
