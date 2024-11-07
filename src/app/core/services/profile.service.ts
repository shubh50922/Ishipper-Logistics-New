import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  //  private apiUrl = "http://localhost:82/api"
private baseUrl = environment.apiUrl
// private apiUrl = "https://gs.mt.cisinlive.com/ishipper/api"
 
  // private apiUrl = " http://192.168.2.134:8035/api"
  constructor(private http: HttpClient) { }
  getUserById(userId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Authenticate/GetUserProfiles?userId=${userId}`);
  }

}
