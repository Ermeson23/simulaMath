import { Component, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, MaxValidator, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';

import { max, merge } from 'rxjs';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIcon, ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  readonly name = new FormControl('', [Validators.required])
  readonly lastName = new FormControl('', [Validators.required])
  readonly email = new FormControl('', [Validators.required, Validators.email]);
  readonly password = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Z0-9]+$')
  ]);
  readonly confirmPassword = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')])
  readonly college = new FormControl('')
  readonly course = new FormControl('')

  showPassword: boolean = false;

  protected readonly value = signal('');

  protected onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
  }

  errorMessageName = signal('');
  errorMessageLastName = signal('');
  errorMessageEmail = signal('');
  errorMessagePassword = signal('');
  errorMessageConfirmPassword = signal('');
  errorMessageCollege = signal('');
  errorMessageCourse = signal('');

  constructor() {
    merge(this.name.statusChanges, this.name.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.nameErrorMessage());

    merge(this.lastName.statusChanges, this.lastName.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.lastNameErrorMessage());

    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.emailErrorMessage());

    merge(this.password.statusChanges, this.password.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.passwordErrorMessage());

    merge(this.confirmPassword.statusChanges, this.confirmPassword.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.confirmPasswordErrorMessage());

    merge(this.college.statusChanges, this.college.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.collegeErrorMessage());

    merge(this.course.statusChanges, this.course.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.courseErrorMessage());
  }

  nameErrorMessage() {
    this.errorMessageName.set(this.getErrorMessage(this.name, 'Nome'));
  }

  lastNameErrorMessage() {
    this.errorMessageLastName.set(this.getErrorMessage(this.lastName, 'Sobrenome'));
  }

  emailErrorMessage() {
    this.errorMessageEmail.set(this.getErrorMessage(this.email, 'E-mail'));
  }

  passwordErrorMessage() {
    this.errorMessagePassword.set(this.getErrorMessage(this.password, 'Senha'));
  }

  confirmPasswordErrorMessage() {
    this.errorMessageConfirmPassword.set(this.getErrorMessage(this.confirmPassword, 'Confirmação de Senha'));
  }

  collegeErrorMessage() {
    this.errorMessageCollege.set(this.getErrorMessage(this.college, 'Faculdade'));
  }

  courseErrorMessage() {
    this.errorMessageCourse.set(this.getErrorMessage(this.course, 'Curso'));
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
    return this.email.valid && this.password.valid && this.confirmPassword.valid;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

}
