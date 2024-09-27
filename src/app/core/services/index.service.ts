import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IndexService {
   isResidential$ = new BehaviorSubject<boolean>(false);
   isCommercial$ = new BehaviorSubject<boolean>(true);
   indexForm$ = new BehaviorSubject<any>(null);  // Default to null or an empty object based on your form structure
   mergeResponse$ = new BehaviorSubject<any>(null);  // Default to null or initial empty state
  indexForm=this.indexForm$.asObservable()
  isResedential=this.isResidential$.asObservable()
  isCommercial=this.isCommercial$.asObservable()
  
  mergeResponse=this.mergeResponse$.asObservable()
  private createHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    'Access-Control-Allow-Origin' :'*'
    });
  }
  updateIndexForm(newFormValue: any): void {
    this.indexForm$.next(newFormValue);
  }
  constructor(private http: HttpClient) { }
    // private apiUrl = environment.apiUrl
  // private apiUrl = "http://localhost:82/api"
 private apiUrl = "https://gs.mt.cisinlive.com/ishipper/api"
  getCountries() : Observable<any> {
    const headers = this.createHeaders();
    return this.http.get<any>(`${this.apiUrl}/Authenticate/GetCountry`);
  }

  getContentList():Observable<any> {
    const headers = this.createHeaders();
    return this.http.get<any>(`${this.apiUrl}/FastCourierAPIIntegration/Getpackagecontentslist`);
  }
  getPackagingType():Observable<any> {
    const headers = this.createHeaders();
    return this.http.get<any>(`${this.apiUrl}/Authenticate/GetPackagingType`);
  }
  getCountrySubvurbs(subburbsValue:any):Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/FastCourierAPIIntegration/Getsuburbs/?suburbs=${subburbsValue}`);
  }

  postFetchQuotes(payload: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Merged/GetQuotation`, payload);
  }
  postMergeQuotes(payload: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Merged/GetQuotation`, payload);
  }
  
 

 
}
