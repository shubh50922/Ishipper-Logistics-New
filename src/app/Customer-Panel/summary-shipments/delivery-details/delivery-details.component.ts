import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/core/services/shared.service';
import { DeliveryDetailService } from 'src/app/core/services/delivery-detail.service';
import { MergeService } from 'src/app/core/services/merge.service';
import { IndexService } from 'src/app/core/services/index.service';

@Component({
  selector: 'app-delivery-details',
  templateUrl: './delivery-details.component.html',
  styleUrls: ['./delivery-details.component.css']
})
export class DeliveryDetailsComponent implements OnInit {
  estimatedDate:any
  indexForm:any
  getDataByIndex:any
  savedCalculation:any
  orderForm:any
  storedData:any
  pickupRequired:any
  checkValues:any
  quoteData:any
 
  constructor(private sharedService:SharedService,private deliveryDetailService:DeliveryDetailService,private mergeService:MergeService,private indexService:IndexService) { }

  ngOnInit(): void {
    this.storedData=this.sharedService.getcheckFormValue()
    this.pickupRequired=this.storedData.isPickupRequired
    this.indexService.indexForm$.subscribe(res=>{
this.indexForm=res
console.log("index form",this.indexForm);

    })
    this.mergeService.ishipperCalculation$.subscribe(res=>{
    this.savedCalculation=res
    console.log("calculatuion",this.savedCalculation);
    
    })
    this.mergeService.quoteData$.subscribe(res=>{
this.quoteData=res
console.log("quotes",this.quoteData);

    })
    this.deliveryDetailService.sharedData$.subscribe(res=>{
      this.orderForm=res
      console.log("orderForm",this.orderForm);
      
    })
    this.deliveryDetailService.checkValues$.subscribe(res=>{
      this.checkValues=res
      console.log("check values",this.checkValues);
      
    })
     console.log("getting pickup required",this.pickupRequired);
    if(this.pickupRequired==true){
this.pickupRequired="Yes"

    }else{
      this.pickupRequired="No"
    }
    
    this.fetchIshipperCalculation()
  }
  
  fetchIshipperCalculation() {
   
    this.estimatedDate=this.quoteData.estimatedDate
    
    this.getDataByIndex=this.quoteData.index
    console.log("get data by index",this.getDataByIndex);
  
    console.log("check logo",this.getDataByIndex.logo);
    
    
    if (this.savedCalculation) {
      
     console.log("saved form response check",this.savedCalculation);
     
      this.orderForm.patchValue({
        quoteId: this.savedCalculation.quoteId,
      });
      
    }
    if (this.indexForm) {
      this.orderForm.patchValue({
        collectionDate: this.indexForm.collectionDate,
      });
    }
    console.log(this.savedCalculation);
    console.log('form value in delivery detail', this.indexForm);
  }
}
