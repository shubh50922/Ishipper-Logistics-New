import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject,observable } from 'rxjs';
import { environment } from '../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class DeliveryDetailService {

sharedData$ = new BehaviorSubject<any>(null);
  sharedData=this.sharedData$.asObservable()
  checkValues$ = new BehaviorSubject<any>(null);
  checkValues=this.checkValues$.asObservable()
payData$ = new BehaviorSubject<any>(null);
payData=this.checkValues$.asObservable()
  constructor(private http: HttpClient) { }
  private baseUrl = environment.apiUrl
  // private apiUrl = "https://gs.mt.cisinlive.com/ishipper/api"
 //private apiUrl = " http://192.168.2.134:8035/api"
  saveOrder(orderPayload: any,orderid:string): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/Authenticate/UpdateCommission?orderid=${orderid}`, orderPayload);
  }
 courierPleaseSaveOrder(orderPayload: any): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/CouriersPleaseAPIIntegration/CreateShipmentCouriersPlease`, orderPayload);
  }
  courierPleaseBookPickup(orderPayload: any): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/CouriersPleaseAPIIntegration/BookPickup`, orderPayload);
  }
  setData(data:any){
this.sharedData=data
  }
  updatesharedData(newFormValue: any): void {
    this.sharedData$.next(newFormValue);
  }
  updatepayData(newFormValue: any): void {
    this.payData$.next(newFormValue);
  }
  updatecheckValues(newFormValue: any): void {
    this.checkValues$.next(newFormValue);
  }

  getData(){
return this.sharedData
  }
  validateAddress(streetAddress: any, expectedSuburb: any, expectedState: any): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/Geocoding/ValidateAddress?streetAddress=${encodeURIComponent(streetAddress)}&expectedSuburb=${encodeURIComponent(expectedSuburb)}&expectedState=${encodeURIComponent(expectedState)}`
    );
  }
  
}
