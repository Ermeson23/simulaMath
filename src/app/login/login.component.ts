import { Component, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { merge } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  readonly email = new FormControl('', [Validators.required, Validators.email]);
  readonly password = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Z0-9]+$')
  ]);

  protected readonly value = signal('');

  protected onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
  }

  errorMessageEmail = signal('');
  errorMessagePassword = signal('');

  constructor() {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.emailErrorMessage());

    merge(this.password.statusChanges, this.password.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.passwordErrorMessage());
  }

  emailErrorMessage() {
    this.errorMessageEmail.set(this.getErrorMessage(this.email, 'E-mail'));
  }

  passwordErrorMessage() {
    this.errorMessagePassword.set(this.getErrorMessage(this.password, 'Senha'));
  }

  getErrorMessage(control: FormControl, controlName: string): string {
    if (control.hasError('required')) {
      return `O campo ${controlName} é obrigatório`;
    } else if (control.hasError('email') && controlName === 'E-mail') {
      return 'E-mail inválido';
    } else if (control.hasError('pattern') && controlName === 'Senha') {
      return 'Senha inválida';
    }
    return '';
  }

  isFormValid() {
    return this.email.valid && this.password.valid;
  }
}