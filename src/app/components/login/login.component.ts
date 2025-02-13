import { Component, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

import { merge } from 'rxjs';

import { LoginRequest } from '../../model/loginRequest';

import { LoginService } from '../../services/login.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIcon, ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  readonly username = new FormControl('', [Validators.required]);
  readonly password = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Z0-9]+$')
  ]);

  showPassword: boolean = false;

  protected readonly value = signal('');

  protected onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
  }

  errorMessageUsername = signal('');
  errorMessagePassword = signal('');

  constructor(
    private router: Router,
    private loginService: LoginService,
    private messageService: MessageService
  ) {
    merge(this.username.statusChanges, this.username.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.usernameErrorMessage());

    merge(this.password.statusChanges, this.password.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.passwordErrorMessage());
  }

  usernameErrorMessage() {
    this.errorMessageUsername.set(this.getErrorMessage(this.username, 'Nome de Usuário'));
  }

  passwordErrorMessage() {
    this.errorMessagePassword.set(this.getErrorMessage(this.password, 'Senha'));
  }

  getErrorMessage(control: FormControl, controlName: string): string {
    if (control.hasError('required')) {
      return `O campo ${controlName} é obrigatório`;
    } else if (control.hasError('username') && controlName === 'Nome de usuário') {
      return 'Nome de usuário inválido';
    } else if (control.hasError('pattern') && controlName === 'Senha') {
      return 'Senha inválida';
    }
    return '';
  }

  isFormValid() {
    return this.username.valid && this.password.valid;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onLogin() {
    const loginData: LoginRequest = {
      username: this.username.value || '',
      password: this.password.value || '',
    };

    this.loginService.login(loginData).subscribe({
      next: (response: any) => {
        if(response?.access) {
          localStorage.setItem('accessToken', response.access);
          this.messageService.message('Login realizado com sucesso!');
        this.router.navigate(['/userProfile']);
        }
        else {
          this.messageService.message('Erro ao obter token de autenticação.');
        }
      },
      error: (err) => {
        console.error('Erro ao fazer login:', err);

        let customMessage = 'Erro ao fazer login.';

        if (err.error?.detail) {
          customMessage = 'Usuário ou senha inválidos.';
        }

        this.messageService.message(customMessage);
      }
    });
  }
}