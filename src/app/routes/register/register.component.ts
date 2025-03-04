import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.nonNullable.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      confirmedPassword: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onSubmit(): void {
    if (!this.loginForm.valid)  return;
    const { username, password, email } = this.loginForm.value;
    this.authService.register(username, password, email).subscribe( {
      next: (resp) => {
        this.router.navigate(['playground']);
      },
      error: (err) => {
        console.error(err)
      }
    });
  }
}
