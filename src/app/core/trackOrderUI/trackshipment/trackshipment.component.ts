import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { TrackOrderService } from '../../services/track-order.service';
import { HotToastService } from '@ngneat/hot-toast';
@Component({
  selector: 'app-trackshipment',
  templateUrl: './trackshipment.component.html',
  styleUrls: ['./trackshipment.component.css']
})
export class TrackshipmentComponent implements OnInit {
  trackForm!: FormGroup;
  viewOrders:any
  trackOrderResponse:any
  isLoading: boolean = false;
  constructor(private trackOrderService:TrackOrderService,private  toast: HotToastService,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.trackForm=this.fb.group({
      orderId:['',Validators.required]
    })
  }
trackOrder(){
  this.viewOrders=this.trackForm.value
  console.log("view orders",this.viewOrders);
  const orderId = this.trackForm.get('orderId')?.value;
  console.log('Order ID:', orderId);
  if(orderId){
    this.isLoading=true
    this.trackOrderService.trackOrder(orderId).subscribe((response:any)=>{
      this.isLoading=false
      this.trackOrderResponse=response
      console.log("track order response",this.trackOrderResponse);
      
    },(error:any)=>{
      this.isLoading=false
      this.toast.error("Error in cancelling this order!")
    })
  }
}
}