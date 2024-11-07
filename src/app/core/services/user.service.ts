// user.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userIdSource = new BehaviorSubject<number | null>(null);
  currentUserId = this.userIdSource.asObservable();
  //  private apiUrl = "http://localhost:82/api"
  // private apiUrl = environment.apiUrl
   // private apiUrl = "http://192.168.2.134:8035/api"
// private apiUrl = "https://gs.mt.cisinlive.com/ishipper/api"
private baseUrl = environment.apiUrl
  constructor(private http: HttpClient) { }

  registercoUser(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/Authenticate/register-CoUser`, data);
  }

  getAllUserProfiles(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Authenticate/GetAllUserProfiles`);
  }

  getUserById(userId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Authenticate/GetUserProfiles/${userId}`);
  }

  updateUserProfile(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/Authenticate/updateUserProfiles`, data);
  }

  deleteUserProfile(userId: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/Authenticate/Terminate`, [userId]); 
  }
  
  changeUserId(userId: number | null) {
    this.userIdSource.next(userId);
  }

}
