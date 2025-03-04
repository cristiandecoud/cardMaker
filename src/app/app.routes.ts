import { Routes } from '@angular/router';
import { PlaygroundComponent } from './routes/playground/playground.component';
import { LoginComponent } from './routes/login/login.component';
import { authGuard } from './guards/auth.guard';
import { RegisterComponent } from './routes/register/register.component';

export const routes: Routes = [
	{ path: 'playground', component: PlaygroundComponent, canActivate: [authGuard] },
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: RegisterComponent},
	{ path: '**', redirectTo: 'login', pathMatch: 'full'}
];
