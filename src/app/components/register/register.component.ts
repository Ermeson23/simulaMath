import { Component, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, MaxValidator, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

import { max, merge } from 'rxjs';

import { User } from '../../model/user';
import { RegisterService } from '../../services/register.service';
import { MessageService } from '../../services/message.service';

@Component({
    selector: 'app-register',
    imports: [MatFormFieldModule, MatInputModule, MatIcon, ReactiveFormsModule, NgIf, RouterLink],
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss'
})
export class RegisterComponent {

  readonly username = new FormControl('', [Validators.required])
  readonly email = new FormControl('', [Validators.required, Validators.email]);
  readonly password = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Z0-9]+$')
  ]);
  readonly confirmPassword = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')])
  readonly faculty = new FormControl('', [Validators.required])
  readonly course = new FormControl('', [Validators.required])

  showPassword: boolean = false;

  protected readonly value = signal('');

  protected onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
  }

  errorMessageusername = signal('');
  errorMessagelast_name = signal('');
  errorMessageEmail = signal('');
  errorMessagePassword = signal('');
  errorMessageConfirmPassword = signal('');
  errorMessageFaculty = signal('');
  errorMessageCourse = signal('');

  constructor(
    private router: Router,
    private registerService: RegisterService,
    private messageService: MessageService
  ) {
    merge(this.username.statusChanges, this.username.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.usernameErrorMessage());

    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.emailErrorMessage());

    merge(this.password.statusChanges, this.password.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.passwordErrorMessage());

    merge(this.confirmPassword.statusChanges, this.confirmPassword.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.confirmPasswordErrorMessage());

    merge(this.faculty.statusChanges, this.faculty.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.facultyErrorMessage());

    merge(this.course.statusChanges, this.course.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.courseErrorMessage());
  }

  usernameErrorMessage() {
    this.errorMessageusername.set(this.getErrorMessage(this.username, 'Nome de usuário'));
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

  facultyErrorMessage() {
    this.errorMessageFaculty.set(this.getErrorMessage(this.faculty, 'Faculdade'));
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
    return (
      this.username.valid &&
      this.email.valid &&
      this.password.valid &&
      this.confirmPassword.valid &&
      this.faculty.valid &&
      this.course.valid
    );
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onRegister() {
    let customMessage = '';

    if (this.password.value !== this.confirmPassword.value) {
      this.messageService.message('As senhas não coincidem!');
      return;
    }

    const registerData: User = {
      username: this.username.value || '',
      email: this.email.value || '',
      password: this.password.value || '',
      faculty: this.faculty.value || '',
      course: this.course.value || ''
    };

    this.registerService.register(registerData).subscribe({
      next: () => {
        this.messageService.message('Registro realizado com sucesso!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Erro ao registrar usuário:', err);

        if (err && err.error) {
          const errorResponse = err.error;

          if (errorResponse.username) {
            customMessage = 'Já existe um usuário com esse nome de usuário.';      
          }

          if (errorResponse.email && customMessage === '') {
            customMessage = 'Já existe um usuário com esse email.';
          }

          if (errorResponse.password && customMessage === '') {
            customMessage = 'Esta senha ou é muito curta, comum ou inteiramente numérica.';
          }

          if (errorResponse.faculty && customMessage === '') {
            customMessage = 'O campo faculdade não pode ficar em branco.';
          }

          if (errorResponse.course && customMessage === '') {
            customMessage = 'O campo curso não pode ficar em branco.';
          }
        }

        if(customMessage === '') {
          customMessage = 'Erro ao registrar usuário. Tente novamente!';
        }
        
        this.messageService.message(customMessage);
      }

    });
  }

}