import { inject, Injectable } from '@angular/core';
import { Account } from '../interfaces/auth.interface';
import { catchError, map, Observable, of, throwError } from 'rxjs';
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
  token: 'tokendeejemplo'
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://api.example.com/auth/login';
  accountStore = inject(AuthStore);

  constructor( private http: HttpClient, private lStorageService: LocalStorageService ) { }

  login(username: string, password: string): Observable<Account> {
    // return this.http.post<Account>(this.apiUrl, { username, password }).pipe(
    return of(accountMock).pipe(
      map( resp => {
        this.lStorageService.setAccount(resp);
        this.accountStore.setAccount(resp);
        return resp;
      }),
      catchError(this.handleError)
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
    console.error(errorMessage); // Log para depuración
    return throwError(() => new Error(errorMessage)); // Retorna el error como un observable
  }
}
