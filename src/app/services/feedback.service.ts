import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment.prod';
import { Feedback } from '../model/feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private readonly baseUrl = environment.baseUrl;
  
    constructor(private httpClient: HttpClient) { }
  
    giveFeedback(data: Feedback): Observable<Feedback> {
      const token = localStorage.getItem('accessToken') || '';
      const headers = { Authorization: `Bearer ${token}` };
    
      return this.httpClient.post<Feedback>(`${this.baseUrl}/api/feedback/`, data, { headers });
    }
  
}