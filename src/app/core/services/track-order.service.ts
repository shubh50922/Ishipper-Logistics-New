import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,BehaviorSubject} from 'rxjs';
import { environment } from '../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class TrackOrderService {
// private apiUrl = "https://gs.mt.cisinlive.com/ishipper/api"
//  private apiUrl = " http://192.168.2.134:8035/api"
private baseUrl = environment.apiUrl
  constructor(private http: HttpClient) { }
  trackOrder(orderId:any):Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/ViewOrder/GetOrderTracking?orderId=${orderId}`);
  }

}
