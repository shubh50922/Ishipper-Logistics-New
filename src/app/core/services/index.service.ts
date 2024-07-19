import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IndexService {
  private createHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    'Access-Control-Allow-Origin' :'*'
    });
  }
  constructor(private http: HttpClient) { }
    // private apiUrl = environment.apiUrl
  // private apiUrl = "http://localhost:82/api"
 private apiUrl = "http://192.168.2.134:8035/api"
  getCountries() : Observable<any> {
    const headers = this.createHeaders();
    return this.http.get<any>(`${this.apiUrl}/Authenticate/GetCountry`);
  }

  getContentList():Observable<any> {
    const headers = this.createHeaders();
    return this.http.get<any>(`${this.apiUrl}/FastCourierAPIIntegration/Getpackagecontentslist`);
  }
  getCountrySubvurbs(subburbsValue:any):Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/FastCourierAPIIntegration/Getsuburbs/?suburbs=${subburbsValue}`);
  }

  postFetchQuotes(payload: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/FastCourierAPIIntegration/PostFetchQuotes`, payload);
  }

}
