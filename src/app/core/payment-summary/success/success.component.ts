import { Component, OnInit } from '@angular/core';
import { PaymentGatewayService } from 'src/app/services/payment-gateway.service';
import { MergeService } from '../../services/merge.service';
import { DeliveryDetailService } from '../../services/delivery-detail.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css'],
})
export class SuccessComponent implements OnInit {
  constructor(
    private paymentGatewayService: PaymentGatewayService,
    private mergeService: MergeService,
    private deliveryDetailService: DeliveryDetailService,
    private route: ActivatedRoute
  ) {}
  processPayload: any;
  method:any
  token:any
  processResponse: any;
  retreiveSession:any
  captureOrder:any
  quoteData: any;
  isLoading: boolean = false;
  payData: any;
  sessionId: any;
  ngOnInit(): void {
    this.subscribeData()
   this.callApis()
    }
    subscribeData(){
      this.paymentGatewayService.processpaypayload$.subscribe((res) => {
        console.log('payloadprocess', res);
        this.processPayload = res || {};
      });
      this.mergeService.quoteData$.subscribe((res) => {
        console.log('quoteData:', res);
        this.quoteData = res || {};
      });
      this.paymentGatewayService.processpayresponse$.subscribe((res) => {
        console.log('responseprocess', res);
        this.processResponse = res || {};
      });
      this.deliveryDetailService.payData$.subscribe((res) => {
        console.log('process payment', res);
        this.payData = res || {};
      });
      this.route.queryParams.subscribe((params) => {
        this.sessionId = params['session_id'];
        console.log(this.sessionId);
        // You can now use the sessionId as needed in your component
      });
      this.token = this.route.snapshot.queryParamMap.get('token');
    console.log(this.token);
    this. method = JSON.parse(localStorage.getItem('paymentMethod') || '{}'); 
    
    }
  callApis(){
    if(this.method=="stripe"){
      this.paymentGatewayService
        .retreiveSession(this.sessionId, true)
        .subscribe((response: any) => {
          if(response)
          {
          
            console.log('response on success', response);
            this.retreiveSession=response
          

          }
          
        });
    }
    debugger
    if(this.method=="paypal"){
      this.paymentGatewayService.captureOrder(this.token,true).subscribe((response:any)=>{
        if(response){
          console.log('response on success', response);
this.captureOrder=response
        }
      })
    }
  }
}
