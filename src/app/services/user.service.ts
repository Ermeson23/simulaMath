import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { UserProfile } from '../model/userProfile';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private baseUrl = environment.baseUrl;

    constructor(private httpClient: HttpClient) { }

    getUserInfo(): Observable<UserProfile> {
        const token = localStorage.getItem('accessToken') || '';
        const headers = { Authorization: `Bearer ${token}` };
        
        return this.httpClient.get<UserProfile>(`${this.baseUrl}/auth/users/me/`,  { headers });
    }
}