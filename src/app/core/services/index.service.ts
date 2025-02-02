import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IndexService {
   isPickupResidential$ = new BehaviorSubject<boolean>(false);
   isPickupCommercial$ = new BehaviorSubject<boolean>(true);
   isDestinationResidential$ = new BehaviorSubject<boolean>(false);
   isDestinationCommercial$ = new BehaviorSubject<boolean>(true);
   indexForm$ = new BehaviorSubject<any>(null);  // Default to null or an empty object based on your form structure
   mergeResponse$ = new BehaviorSubject<any>(null);  // Default to null or initial empty state
  indexForm=this.indexForm$.asObservable()
  isPickupResedential=this.isPickupResidential$.asObservable()
  isPickupCommercial=this.isPickupCommercial$.asObservable()
  isDestinationResedential=this.isDestinationResidential$.asObservable()
  isDestinationCommercial=this.isDestinationCommercial$.asObservable()
  
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
    private baseUrl = environment.apiUrl
  
 //private apiUrl = "https://gs.mt.cisinlive.com/ishipper/api"
  //private apiUrl = " http://192.168.2.134:8035/api"
  getCountries() : Observable<any> {
    const headers = this.createHeaders();
    return this.http.get<any>(`${this.baseUrl}/Authenticate/GetCountry`);
  }

  getContentList():Observable<any> {
    const headers = this.createHeaders();
    return this.http.get<any>(`${this.baseUrl}/FastCourierAPIIntegration/Getpackagecontentslist`);
  }
  getPackagingType():Observable<any> {
    const headers = this.createHeaders();
    return this.http.get<any>(`${this.baseUrl}/Authenticate/GetPackagingType`);
  }
  getCountrySubvurbs(subburbsValue:any):Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/FastCourierAPIIntegration/Getsuburbs/?suburbs=${subburbsValue}`);
  }

  postFetchQuotes(payload: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/Merged/GetQuotation`, payload);
  }
  postMergeQuotes(payload: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/Merged/GetQuotation`, payload);
  }
  
 

 
}
