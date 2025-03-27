import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';

import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-user-profile',
    imports: [MatProgressSpinnerModule, MatCardModule, CommonModule],
    templateUrl: './user-profile.component.html',
    styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {

  userData: any;
  feedbacks: any[] = [];
  doubts: any[] = [];
  loading: boolean = true;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    this.userService.getUserInfo().subscribe({
      next: (response: any) => {
        this.userData = response;
        this.feedbacks = response.feedbacks;
        this.doubts = response.doubts;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar as informações do usuário:', err);
        this.loading = false;
      }
    });
  }

}
