import { inject, Injectable } from '@angular/core';
import { Account } from '../interfaces/auth.interface';
import { map, Observable, throwError } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthStore } from '../stores/auth.store';

const accountMock: Account = {
  id: '123',
  username: "jdon",
  role: "User",
  darkMode: true,
  name: {
    firstname: "John",
    lastname: "Donovan"
  },
  token: 'tokendeejemplo',
  isAuthenticated: true
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/users';
  accountStore = inject(AuthStore);

  constructor(private lStorageService: LocalStorageService, private http: HttpClient ) { }

  login(username: string, password: string): Observable<Account> {
    const email = username;
    return this.http.post<Account>(this.apiUrl + '/login', { email, password }, { withCredentials: true }).pipe(
      map( resp => {
        console.log('entra al login', resp)
        this.lStorageService.setAccount(resp);
        this.accountStore.setAccount(resp);
        return resp;
      }),
      // catchError(this.handleError)
    );
  }

  register(username: string, password: string, email: string): Observable<Account> {
    return this.http.post<Account>(this.apiUrl + '/register', { username, password, email }).pipe(
      map( resp => {
        console.log('entra al register', resp)
        this.lStorageService.setAccount(resp);
        this.accountStore.setAccount(resp);
        return resp;
      }),
      // catchError(this.handleError)
    );
  }

  logout() {
    this.lStorageService.removeAccount();
    this.accountStore.clean();
  }

  isAuthenticated() {
    return this.accountStore.isAuthenticated;
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocurrió un error desconocido';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `Código de error: ${error.status}\nMensaje: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
