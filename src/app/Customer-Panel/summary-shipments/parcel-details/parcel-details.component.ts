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
  payData:any
  constructor(
    private indexService: IndexService,
    private deliveryDetailService: DeliveryDetailService,
    private mergeService: MergeService
  ) {}
  totalWeight: any;
  ngOnInit(): void {
    this.indexService.indexForm$.subscribe((res) => {
      console.log('indexForm data:', res);
      this.indexForm = res || {};
      this.populateParcelData(); 
    });
  
    this.deliveryDetailService.sharedData$.subscribe((res) => {
      console.log('orderForm data:', res);
      this.orderForm = res || {};
      this.populateParcelData(); 
    });
  
    this.mergeService.quoteData$.subscribe((res) => {
      console.log('quoteData:', res);
      this.quoteData = res || {};
      this.populateParcelData(); 
    });
this.deliveryDetailService.payData$.subscribe((res)=>{
  console.log('total cost:', res);
  this.payData = res || {};
  this.populateParcelData(); 
})
  }
  
  populateParcelData() {
    if (this.indexForm && this.orderForm && this.quoteData) {
      console.log('Index Form:', this.indexForm);
      console.log('Order Form:', this.orderForm);
      console.log('Quote Data:', this.quoteData);
  
      const shippingCost =this.payData.shipment;
      const warrantyCost = 0;
      const estimatedValue = this.quoteData.index.ishhiperFinalPrice || 0;
      const totalCost = this.payData.total;
      const itemsArray = this.indexForm.items;
      this.parcelData = [{
        customer: this.orderForm.pickupFirstName + ' ' + this.orderForm.pickupLastName,
        date: this.indexForm.collectionDate,
        weight: this.indexForm.weights || 'N/A',
        length: this.indexForm.lengths || 'N/A',
        width: this.indexForm.widths || 'N/A',
        height: this.indexForm.heights || 'N/A',
        packageType: itemsArray.type || 'N/A',
        contentType: this.orderForm.parcelContent || 'N/A',
        estimatedValue: estimatedValue,
        shippingCost: shippingCost||'00',
        warrantyCost: warrantyCost,
        total: totalCost||'00'
      }];
  
      console.log('Parcel Data:', this.parcelData);
    } else {
      console.log('Data not yet available for parcelData population');
    }
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
