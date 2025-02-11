import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { User } from '../model/user';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private readonly baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}

  register(data: User): Observable<User> {
    return this.httpClient.post<User>(`${this.baseUrl}/auth/users/`, data);
  }
}