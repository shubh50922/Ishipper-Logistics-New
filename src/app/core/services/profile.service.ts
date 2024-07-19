import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  //  private apiUrl = "http://localhost:82/api"
// private apiUrl = environment.apiUrl
private apiUrl = "http://192.168.2.134:8035/api"
  // private apiUrl = "http://192.168.2.134:8035/api"
  constructor(private http: HttpClient) { }
  getUserById(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Authenticate/GetUserProfiles?userId=${userId}`);
  }

}
