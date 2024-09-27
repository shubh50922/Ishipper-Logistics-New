import { Component, OnInit } from '@angular/core';
import { IndexService } from 'src/app/core/services/index.service';
import { DeliveryDetailService } from 'src/app/core/services/delivery-detail.service';
import { MergeService } from 'src/app/core/services/merge.service';
@Component({
  selector: 'app-parcel-details',
  templateUrl: './parcel-details.component.html',
  styleUrls: ['./parcel-details.component.css'],
})
export class ParcelDetailsComponent implements OnInit {
  estimatedDate: any;
  indexForm: any = {};
  formattedCollectionDate: any;
  savedCalculation: any;
  quoteData: any;
  getDataByIndex:any
  parcelData:any
  checkValues: any;
  orderForm: any = {};
  constructor(
    private indexService: IndexService,
    private deliveryDetailService: DeliveryDetailService,
    private mergeService: MergeService
  ) {}
  totalWeight: any;
  ngOnInit(): void {
    this.fetchIshipperCalculation();
    this.indexService.indexForm$.subscribe((res) => {
      this.indexForm = res || {}; // Ensure indexForm is never undefined
      console.log('index form', this.indexForm);
    });
 
    // Subscribe to sharedData$ and assign to orderForm
    this.deliveryDetailService.sharedData$.subscribe((res) => {
      this.orderForm = res || {}; // Ensure orderForm is never undefined
      console.log('orderForm', this.orderForm);
    });

    this.mergeService.ishipperCalculation$.subscribe((res) => {
      this.savedCalculation = res;
      console.log('calculatuion', this.savedCalculation);
    });
    this.mergeService.quoteData$.subscribe((res) => {
      this.quoteData = res;
      console.log('quotes', this.quoteData);
    });
    this.getDataByIndex=this.quoteData.index
    console.log("get data by index",this.getDataByIndex);
    this.deliveryDetailService.checkValues$.subscribe((res) => {
      this.checkValues = res;
      console.log('check values', this.checkValues);
    });
  
    this.parcelData=[{
      customer:this.orderForm.pickupFirstName + ' ' + this.orderForm.pickupLastName,
      date:this.indexForm.collectionDate,
      weight:this.indexForm.items.weight,
      length:this.indexForm.items.length,
      width:this.indexForm.items.width,
      height:this.indexForm.items.height,
      packagetype:this.indexForm.items.type,
      contenttype:this.orderForm.parcelContent,
      estimatedValue:this.getDataByIndex.ishhiperFinalPrice,
      shippingcost:'00',
      warrenycost:'00',
      total:this.getDataByIndex.ishhiperFinalPrice+this.parcelData.shippingcost+this.parcelData.warrenycost


    }]
    console.log("parcel data",this.parcelData);
    
  }
  
  fetchIshipperCalculation() {
    this.estimatedDate = JSON.parse(
      localStorage.getItem('estimatedDate') || ''
    );

    this.formattedCollectionDate = JSON.parse(
      localStorage.getItem('convertedCollection') || ''
    );
    console.log('formatted collection date', this.formattedCollectionDate);
    this.orderForm = JSON.parse(localStorage.getItem('orderForm') || '');
    console.log('check logo', this.formattedCollectionDate.logo);
    this.totalWeight = localStorage.getItem('totalweight') || '{}';
    this.savedCalculation = JSON.parse(
      localStorage.getItem('fetchcalculation') || '{}'
    );
    if (this.savedCalculation) {
      console.log('saved form response check', this.savedCalculation);

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
