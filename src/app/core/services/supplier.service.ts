import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  //  private apiUrl = "http://localhost:82/api"
  // private apiUrl = environment.apiUrl
  // private apiUrl = "http://192.168.2.134:8035/api"
  private apiUrl = "http://192.168.2.134:8035/api"
  constructor(private http: HttpClient) { }
  getData(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/EasyPost/GetServices`);
  }
  
  saveSettings(settingsData: any[], userId: string): Observable<any> {
   
    console.log(settingsData,"------");
    
    const payload = { userId, settings: settingsData };
    return this.http.post(`${this.apiUrl}/Authenticate/SaveSettings`, payload);
  }

  getUserSettings(userId: string): Observable<any> {
   
   return this.http.get(`${this.apiUrl}/Authenticate/GetSettings?userId=${userId}`);
   }
}