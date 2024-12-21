import { Component, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';

import { merge } from 'rxjs';

@Component({
  selector: 'app-password-recovery',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './password-recovery.component.html',
  styleUrl: './password-recovery.component.scss'
})
export class PasswordRecoveryComponent {
  
  readonly email = new FormControl('', [Validators.required, Validators.email]);

  protected readonly value = signal('');

  protected onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
  }

  errorMessageEmail = signal('');

  constructor(
    private router: Router
  ) {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.emailErrorMessage());
  }

  emailErrorMessage() {
    this.errorMessageEmail.set(this.getErrorMessage(this.email, 'E-mail'));
  }

  getErrorMessage(control: FormControl, controlName: string): string {
    if (control.hasError('required')) {
      return 'O campo e-mail é obrigatório';
    } else if (control.hasError('email')) {
      return 'E-mail inválido';
    }
    return '';
  }

  isFormValid() {
    return this.email.valid;
  }

  onRecoveryPassword() {
    this.router.navigate(['/login']);
  }
}