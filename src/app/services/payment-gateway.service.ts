import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,BehaviorSubject} from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PaymentGatewayService {
  processpayresponse$ = new BehaviorSubject<any>(null);
  processpayresponse=this.processpayresponse$.asObservable()
  processpaypayload$ = new BehaviorSubject<any>(null);
  processpaypayload=this.processpaypayload$.asObservable()
  constructor(private http: HttpClient) { }
  // private apiUrl = "https://gs.mt.cisinlive.com/ishipper/api"
  //  private apiUrl = " http://192.168.2.134:8035/api"
  private baseUrl = environment.apiUrl
  squareIntegration(payload: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/SquarePayment/process-payment`, payload);
  }
 stripeIntegration(payload: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/StripePayment/create-payment-intent`, payload);
  }
  createOrderPaypal(amount: number, currency: string): Observable<any> {
    // Using post method with an empty body, assuming query parameters in URL
    return this.http.post<any>(
      `${this.baseUrl}/PayPal/create-order?amount=${amount}&currency=${currency}`, 
      {}
    );
  }
  updateprocesspayresponse(data: any): void {
    this.processpayresponse$.next(data);
  }
  updateprocesspaypayload(data: any): void {
    this.processpaypayload$.next(data);
  }
  postpaymentProcess(payload: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/IshipperProcess/ProcessPayment`, payload);
  }
  postPromotionCode(code: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/PromotionalCodes/ValidatePromotionalCode?code=${code}`);
  }
  retreiveSession(sessionId: string,SuccessorFailure:boolean): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/StripePayment/retrieve-session?sessionId=${encodeURIComponent(sessionId)}&SuccessorFailure=${encodeURIComponent(SuccessorFailure)}`
    );
  }
  bookOrderFastCourier(FCorderid: string): Observable<any> {
    console.log("id in booking order ", FCorderid);
    
    return this.http.post<any>(
      `${this.baseUrl}/FastCourierAPIIntegration/OrderBooking?FCorderid=${encodeURIComponent(FCorderid)}`,{}
    );
  }
  cancelOrderFastCourier(fcorderId: string,payload:any): Observable<any> {
    console.log("id in booking order ", fcorderId);
    
    return this.http.post<any>(
      `${this.baseUrl}/FastCourierAPIIntegration/CancelOrder?fcorderId=${encodeURIComponent(fcorderId)}`,payload
    );
  }
  sendleCreateOrder(payload:any): Observable<any>{
    return this.http.post<any>(
      `${this.baseUrl}/SendleAPIIntegration/create-order`,payload
    );
  }
 createShipmentCourierPlease(payload:any): Observable<any>{
    return this.http.post<any>(
      `${this.baseUrl}/CouriersPleaseAPIIntegration/CreateShipmentCouriersPlease`,payload
    );
  }
  createShipmentSingleCourierPlease(payload:any): Observable<any>{
    return this.http.post<any>(
      `${this.baseUrl}/CouriersPleaseAPIIntegration/SingleBookPickup`,payload
    );

  }
  cancelOrderCourierPlease(consignmentCode:any): Observable<any> {
   
    
    return this.http.post<any>(
      `${this.baseUrl}/CouriersPleaseAPIIntegration/CancelShipment?consignmentCode=${encodeURIComponent(consignmentCode)}`,{}
    );
  }
  captureOrder(orderId: string,SuccessorFailure:boolean): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/PayPal/capture-order?orderId=${encodeURIComponent(orderId)}&SuccessorFailure=${encodeURIComponent(SuccessorFailure)}`,{}
    );
  } 
} 