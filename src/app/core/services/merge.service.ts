import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class MergeService {
  ishipperCalculation$ = new BehaviorSubject<boolean>(false);
  ishipperCalculation=this.ishipperCalculation$.asObservable()
  quoteData$ = new BehaviorSubject<any>(null);
  quoteData=this.quoteData$.asObservable()
  private baseUrl = environment.apiUrl
//private apiUrl = "https://gs.mt.cisinlive.com/ishipper/api"
 //private apiUrl = " http://192.168.2.134:8035/api"
  constructor(private http: HttpClient) { }
  getIShipperCalculation(quotationId: string, userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/Merged/GetIShipperCalculation?quotationId=${quotationId}&UserId=${userId}`);
  }
  postSaveOrder(orderId: string, orderData: any): Observable<any> {
    
    return this.http.post(`${this.baseUrl}/FastCourierAPIIntegration/PostSaveOrder?orderid=${orderId}`,orderData);
  }
  getinsuranceList():Observable<any> {
   
    return this.http.get<any>(`${this.baseUrl}/FastCourierAPIIntegration/GetInsuranceList`);
  }
  updateIshipperCalculation(newFormValue: any): void {
    this.ishipperCalculation$.next(newFormValue);
  }
  updateQuoteData(newData: any): void {
    this.quoteData$.next(newData);
  }
}
