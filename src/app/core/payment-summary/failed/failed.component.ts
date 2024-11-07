import { Component, OnInit } from '@angular/core';
import { PaymentGatewayService } from 'src/app/services/payment-gateway.service';
import { HotToastService } from '@ngneat/hot-toast';
@Component({
  selector: 'app-failed',
  templateUrl: './failed.component.html',
  styleUrls: ['./failed.component.css']
})
export class FailedComponent implements OnInit {

  constructor( private paymentGatewayService: PaymentGatewayService,private  toast: HotToastService) { }

  ngOnInit(): void {
    const payload={
      "reason": "booked by mistake"
    }
   const id= JSON.parse(localStorage.getItem('fcorderId') || '{}');
this.paymentGatewayService.cancelOrderFastCourier(id,payload).subscribe((response:any)=>{
  if(response.message== "Order canceled successfully."){
this.toast.error("Could not place this order.")
  }
})
  }

}
