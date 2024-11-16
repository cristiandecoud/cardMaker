import { Component, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthStore } from '../../stores/auth.store';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  providers: [],
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnChanges {
  authStore = inject(AuthStore);
  username: string = '';
  isAuthenticated = false;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    console.log(this.authStore.username())
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.authStore.username())
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['login']);
  }

  login() {
    // this.router.navigate(['login']);  
    alert(this.authStore.username())
  }

}
