import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject,observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DeliveryDetailService {

sharedData$ = new BehaviorSubject<any>(null);
  sharedData=this.sharedData$.asObservable()
  checkValues$ = new BehaviorSubject<any>(null);
  checkValues=this.checkValues$.asObservable()
 
  constructor(private http: HttpClient) { }
  private apiUrl = "https://gs.mt.cisinlive.com/ishipper/api"

  saveOrder(orderPayload: any,orderid:string): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/Authenticate/UpdateCommission?orderid=${orderid}`, orderPayload);
  }
 courierPleaseSaveOrder(orderPayload: any): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/CouriersPleaseAPIIntegration/CreateShipmentCouriersPlease`, orderPayload);
  }
  courierPleaseBookPickup(orderPayload: any): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/CouriersPleaseAPIIntegration/BookPickup`, orderPayload);
  }
  setData(data:any){
this.sharedData=data
  }
  updatesharedData(newFormValue: any): void {
    this.sharedData$.next(newFormValue);
  }
  updatecheckValues(newFormValue: any): void {
    this.checkValues$.next(newFormValue);
  }

  getData(){
return this.sharedData
  }
}
