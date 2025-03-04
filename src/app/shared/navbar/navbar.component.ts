import { Component, inject } from '@angular/core';
import { AuthStore } from '../../stores/auth.store';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  authStore = inject(AuthStore);
  username: string = '';
  isAuthenticated = false;

  constructor(private router: Router, private authService: AuthService) { }

  logout(){
    this.authService.logout();
    this.router.navigate(['login']);
  }

  login() {
    this.router.navigate(['login']);  
  }

}
