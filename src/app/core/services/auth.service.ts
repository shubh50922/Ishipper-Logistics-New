import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  user: any; // Remove array declaration
   private baseUrl = environment.apiUrl

  private httpOptions = {
    headers: new HttpHeaders({ 
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    })
  };
 // private apiUrl = "https://gs.mt.cisinlive.com/ishipper/api"
    // private apiUrl = " http://192.168.2.134:8035/api"
    
  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/Authenticate/register`, userData,this.httpOptions).pipe(
      catchError((error) => {
        console.error('Registration error:', error);
        return throwError(error);
      })
    );
  }

  login(data: any): Observable<any> {
    
    return this.http
      .post(`${this.baseUrl}/Authenticate/login`, data,this.httpOptions)
      .pipe(
        tap((response: any) => {
          // Store user details upon successful login
          this.user = response.user;
          const token = response.token; // Assuming response contains a token
          // Persist user data and token in local storage

          localStorage.setItem('token', token);
          console.log('check user', this.user);

          localStorage.setItem('role', response.userRoles);
        }),
        catchError((error) => {
          console.error('Login error:', error);
          return throwError(error);
        })
      );
  }
  encrypt(txt: any): string {
    return CryptoJS.AES.encrypt(txt, 'user').toString();
  }
  decrypt(txtToDecrypt: string) {
    return CryptoJS.AES.decrypt(txtToDecrypt, 'user').toString(
      CryptoJS.enc.Utf8
    );
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }
  clearToken(): void {
    console.log('token cleared');
    localStorage.removeItem('token');
    localStorage.removeItem('CompanyID');
    localStorage.removeItem('role');
  }
  getUserId(): string | null {
    const user = localStorage.getItem('user');
    return user ? user : null;
  }
  getCompanyId(): number | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).companyId : null;
  }
  getRole() {
    return localStorage.getItem('role');

  }
  postEmailforReset(email:any){
    return this.http.post<any>(
      `${this.baseUrl}/Authenticate/ForgetPassword?email=${encodeURIComponent(email)}`,{}
    );
  }
 SetNewPassword(payload:any){
    return this.http.post<any>(
      `${this.baseUrl}/Authenticate/resetpassword`,payload
    );
  }
}
