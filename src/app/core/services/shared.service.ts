import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
isPickupRequired:any
deliveryDetails:any
  constructor() { }
setcheckFormValue(data:any){
this.isPickupRequired=data
console.log("setting pickup required",this.isPickupRequired);

  }
  getcheckFormValue(){
return this.isPickupRequired
  }
  setDeliveryDetails(data:any){
this.deliveryDetails=data
  }
  getDeliveryDetails(){
    return this.deliveryDetails
  }
}
