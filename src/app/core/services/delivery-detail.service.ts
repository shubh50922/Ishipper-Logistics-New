import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DeliveryDetailService {

  constructor(private http: HttpClient) { }
  private apiUrl = "https://gs.mt.cisinlive.com/ishipper/api"

  saveOrder(orderPayload: any,orderid:string): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/Authenticate/UpdateCommission?orderid=${orderid}`, orderPayload);
  }
}
