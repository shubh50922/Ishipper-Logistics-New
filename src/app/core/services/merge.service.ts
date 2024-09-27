import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MergeService {
  ishipperCalculation$ = new BehaviorSubject<boolean>(false);
  ishipperCalculation=this.ishipperCalculation$.asObservable()
  quoteData$ = new BehaviorSubject<any>(null);
  quoteData=this.quoteData$.asObservable()
private apiUrl = "https://gs.mt.cisinlive.com/ishipper/api"
  constructor(private http: HttpClient) { }
  getIShipperCalculation(quotationId: string, userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/Merged/GetIShipperCalculation?quotationId=${quotationId}&UserId=${userId}`);
  }
  getinsuranceList():Observable<any> {
   
    return this.http.get<any>(`${this.apiUrl}/FastCourierAPIIntegration/GetInsuranceList`);
  }
  updateIshipperCalculation(newFormValue: any): void {
    this.ishipperCalculation$.next(newFormValue);
  }
  updateQuoteData(newData: any): void {
    this.quoteData$.next(newData);
  }
}
