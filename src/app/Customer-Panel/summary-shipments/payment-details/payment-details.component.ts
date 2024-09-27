import { Component, OnInit } from '@angular/core';
import { stripe } from 'ngx-bootstrap-icons';
import { Router } from '@angular/router';
import { PaymentGatewayService } from 'src/app/services/payment-gateway.service';
@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent implements OnInit {
  isModalOpen!:Boolean
  method!:string
  
  // usingSquare:boolean=false
  // usingStripe:boolean=false
  constructor( private paymentGatewayService: PaymentGatewayService, private router: Router) { }

  ngOnInit(): void {
  }
  setMethod(value: string) {
    this.method = value;
    console.log('Payment method set to:', this.method); // Optional: For debugging
  }
  paymentMethod(){
    
    
      
      
    if(this.method=='square'){
      const payload = { "nonce": "cnon:card-nonce-ok",
        "amount": 444,
        "locationId": "LARK7C8QEK3H4"}
        if(payload){
          this.paymentGatewayService.squareIntegration(payload).subscribe((response:any)=>{
           
            console.log("redirect to square",response);
            
          })
            }
    }
        
        if(this.method=='stripe'){
          const payload = {
            "amount": 12345,  // Ensure the amount is an integer value (representing cents, e.g., $123.45 as 12345)
            "currency": "aud",  
            "paymentMethodId": "pm_card_visa"  
          }
            if(payload){
              this.paymentGatewayService.stripeIntegration(payload).subscribe((response:any)=>{
                if (response && response.sessionURL) {
                  // Redirect to the session URL in the same tab
                  window.location.href = response.sessionURL;
                }
                console.log("redirect to stripe",response);
                
              })
                }
        }
        
          }
}
