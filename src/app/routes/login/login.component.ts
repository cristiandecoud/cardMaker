import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    // private authService: AuthService
  ) {
    this.loginForm = this.fb.nonNullable.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      this.router.navigate(['playground']);

      // login al servidor
      // this.authService.login(username, password).subscribe(
      //   (response) => {
      //     console.log('Login exitoso', response);
      //     // Redirigir al usuario a la página deseada
      //   },
      //   (error) => {
      //     console.error('Error de login', error);
      //     // Mostrar mensaje de error al usuario
      //   }
      // );
    }
  }
}
