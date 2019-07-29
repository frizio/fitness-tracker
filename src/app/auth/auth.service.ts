import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: User;

  constructor() { }

  registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 1000).toString()
    };
  }

  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 1000).toString()
    };
  }

  logout() {
    this.user = null;
  }

  getUser(): User {
    return { ...this.user };
  }

  isAuth() {
    return this.user !== null;
  }
}
