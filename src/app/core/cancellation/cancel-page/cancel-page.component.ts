import { Component, OnInit } from '@angular/core';
import { CancelOrderService } from '../../services/cancel-order.service';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
@Component({
  selector: 'app-cancel-page',
  templateUrl: './cancel-page.component.html',
  styleUrls: ['./cancel-page.component.css']
})
export class CancelPageComponent implements OnInit {
  cancelForm!: FormGroup;
  storeCancelData:any
  orderCancelResponse:any
  isLoading: boolean = false;
  constructor(private cancelOrderService:CancelOrderService,private toast:HotToastService, private fb: FormBuilder,) { }

  ngOnInit(): void {
    this.cancelForm=this.fb.group({
reason:['',Validators.required],
orderId:['',Validators.required]
    })
  }


  cancelOrder(){
    this.storeCancelData=this.cancelForm.value
    console.log("cancel form value",this.storeCancelData);
    
    const orderId = this.cancelForm.get('orderId')?.value;
    const reason = this.cancelForm.get('reason')?.value;
    console.log('Order ID:', orderId);
    if(this.storeCancelData && this.cancelForm.valid){
      this.isLoading=true
      this.cancelOrderService.cancelOrder(orderId,reason).subscribe((response:any)=>{if(response){
        this.isLoading=false
        this.orderCancelResponse=response
console.log("order cancel success",this.orderCancelResponse);

      }
        if( response.message=="Order/Shipment canceled successfully."){
          this.toast.success("Order/Shipment canceled successfully.")

        }
      },(error:any)=>{
        this.isLoading=false
        this.toast.error("Error in cancelling this order!")
      })
    }
  }
}
