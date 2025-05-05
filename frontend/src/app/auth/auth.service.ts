import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/login_check`, {
      email: credentials.email,
      password: credentials.password
    });
  }

  saveUserEmail(email: string): void {
    localStorage.setItem('user_email', email);
  }

  getUserEmail(): string | null {
    return localStorage.getItem('user_email');
  }

  saveToken(token: string): void {
    localStorage.setItem('jwt_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('jwt_token');
  }

  logout(): void {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user_email');
  }
}
