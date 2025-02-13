import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../model/loginRequest';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

  login(data: LoginRequest): Observable<LoginRequest> {
    return this.httpClient.post<LoginRequest>(`${this.baseUrl}/auth/jwt/create/`, data);
  }
}