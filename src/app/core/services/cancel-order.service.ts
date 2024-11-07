import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CancelOrderService {
  private baseUrl = environment.apiUrl
  constructor(private http: HttpClient) { }
  // private apiUrl = "https://gs.mt.cisinlive.com/ishipper/api"
// private apiUrl = " http://192.168.2.134:8035/api"
  cancelOrder(orderId: string,Reason:any): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/CancelOrders/CancelOrderOrShipment?orderId=${encodeURIComponent(orderId)}`,{Reason}
    );
  } 
}
