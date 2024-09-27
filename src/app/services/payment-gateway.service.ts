import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PaymentGatewayService {

  constructor(private http: HttpClient) { }
  private apiUrl = "https://gs.mt.cisinlive.com/ishipper/api"
  squareIntegration(payload: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/SquarePayment/process-payment`, payload);
  }
 stripeIntegration(payload: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/StripePayment/create-payment-intent`, payload);
  }
}
