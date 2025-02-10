import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Observable } from 'rxjs';

import { User } from '../model/user';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private readonly baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient, private matSnackBar: MatSnackBar) {}

  register(data: User): Observable<User> {
    return this.httpClient.post<User>(`${this.baseUrl}/auth/users/`, data);
  }

  message(message: string) {
    this.matSnackBar.open(`${message}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    })
  }
}