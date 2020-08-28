import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Token } from '../../models/extra-models/token.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(
    private router: Router,
  ) { }

  setToken(token: Token, userName: string): void {
    localStorage.setItem(environment.token, JSON.stringify(token));
  }

  getToken(): Token {
    return JSON.parse(localStorage.getItem(environment.token));
  }

  clearToken(): void {
    localStorage.removeItem(environment.token);
  }
}
