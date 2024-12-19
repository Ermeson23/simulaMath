import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SimulatorComponent } from './simulator/simulator.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component';

export const routes: Routes = [
    { path: '', component: SimulatorComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'feedback', component: FeedbackComponent },
    { path: 'passwordRecovery', component: PasswordRecoveryComponent },
];
