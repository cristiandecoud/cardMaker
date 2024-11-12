import { Routes } from '@angular/router';
import { PlaygroundComponent } from './routes/playground/playground.component';
import { LoginComponent } from './routes/login/login.component';

export const routes: Routes = [
	{ path: 'playground', component: PlaygroundComponent },
	{ path: 'login', component: LoginComponent },
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
	{path: '**', redirectTo: 'login', pathMatch: 'full'}
];
