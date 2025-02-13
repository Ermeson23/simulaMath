import { Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SimulatorComponent } from './components/simulator/simulator.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { PasswordRecoveryComponent } from './components/password-recovery/password-recovery.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

export const routes: Routes = [
    { path: '', component: SimulatorComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'feedback', component: FeedbackComponent },
    { path: 'passwordRecovery', component: PasswordRecoveryComponent },
    { path: 'userProfile', component: UserProfileComponent },
];
