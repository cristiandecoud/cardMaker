import { Injectable } from '@angular/core';
import { Account } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setItem(key: string, value: string) {
    localStorage.setItem(key, value);
  } 
  
  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }
  
  setAccount(accountData: Account) {
    const accountString = JSON.stringify(accountData);
    localStorage.setItem('account', accountString);
  }

  getAccount(): Account | null {
    const account = this.getItem('account')
    if(account) return JSON.parse(account);

    return null; 
  }

  removeAccount() {
    localStorage.removeItem('account');
  }

}
