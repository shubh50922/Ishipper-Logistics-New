import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/core/services/shared.service';
import { DeliveryDetailService } from 'src/app/core/services/delivery-detail.service';
import { MergeService } from 'src/app/core/services/merge.service';
import { IndexService } from 'src/app/core/services/index.service';
import { HotToastService } from '@ngneat/hot-toast';

import { PaymentGatewayService } from 'src/app/services/payment-gateway.service';
@Component({
  selector: 'app-delivery-details',
  templateUrl: './delivery-details.component.html',
  styleUrls: ['./delivery-details.component.css'],
})
export class DeliveryDetailsComponent implements OnInit {
  estimatedDate: any;
  indexForm: any;
  getDataByIndex: any;
  savedCalculation: any;
  orderForm: any;
  updatedPayData: any;
  storedData: any;
  pickupRequired: any;
  checkValues: any;
  quoteData: any;
  promotionCodes: any;
  payData: any;
  removeEnable: boolean = false;
  voucherCode: any;
  constructor(
    private sharedService: SharedService,
    private deliveryDetailService: DeliveryDetailService,
    private mergeService: MergeService,
    private indexService: IndexService,
    private paymentGatewayService: PaymentGatewayService,
    private toast: HotToastService
  ) {}

  ngOnInit(): void {
    
    this.storedData = this.sharedService.getcheckFormValue();
    this.pickupRequired = this.storedData.isPickupRequired;
    this.indexService.indexForm$.subscribe((res) => {
      this.indexForm = res;
      console.log('index form', this.indexForm);
    });
    this.mergeService.ishipperCalculation$.subscribe((res) => {
      this.savedCalculation = res;
      console.log('calculatuion', this.savedCalculation);
    });
    this.mergeService.quoteData$.subscribe((res) => {
      this.quoteData = res;
      console.log('quotes', this.quoteData);
    });
    this.deliveryDetailService.payData$.subscribe((res) => {
      this.payData = res;
      console.log('paydata first time', this.payData);
    });
    this.deliveryDetailService.sharedData$.subscribe((res) => {
      this.orderForm = res;
      console.log('orderForm', this.orderForm);
    });
    this.deliveryDetailService.checkValues$.subscribe((res) => {
      this.checkValues = res;
      console.log('check values', this.checkValues);
    });
    console.log('getting pickup required', this.pickupRequired);
    if (this.pickupRequired == true) {
      this.pickupRequired = 'Yes';
    } else {
      this.pickupRequired = 'No';
    }

    this.fetchIshipperCalculation();
  }
  getPromotionCode() {
    this.paymentGatewayService.postPromotionCode(this.voucherCode).subscribe((response: any) => {
      if (response) {
        this.promotionCodes = response;
        console.log("promotion code", response);
  
        // Check if the 'valid' field is true or false after receiving the response
        if (this.promotionCodes.valid === true) {
          this.removeEnable = true;
          console.log('vouchercode matched', this.voucherCode);
  
          this.updatedPayData = {
            payMethod: this.payData.payMethod,
            shipment: 0,
            total: this.payData.total - this.payData.shipment,
            codeName: this.voucherCode,
            codeValid:true
          };
  
          console.log('updated pay data', this.updatedPayData);
  
          this.deliveryDetailService.updatepayData(this.updatedPayData);
          this.toast.success('Coupon code applied successfully');
        } 
        // else if (this.promotionCodes.valid === false) {
        //   this.removeEnable = false;
        //   this.toast.error('Invalid coupon code');
        //   console.log('invalid voucher code', this.voucherCode);
        // }
      }
    }, error => {
      console.error('Error fetching promotion code:', error);
      this.toast.error('Failed to apply coupon code');
    });
  }
  
  removeVoucherCode() {
    if (this.removeEnable) {
      this.voucherCode = '';

      if (this.updatedPayData && this.updatedPayData.payMethod) {
        let shipping = 0;
        let total = 0;

        // Calculate shipping and total based on the payment method
        switch (this.updatedPayData.payMethod) {
          case 'stripe':
            shipping = 0.017 * this.quoteData.index.ishhiperFinalPrice + 0.3;
            total = this.quoteData.index.ishhiperFinalPrice + shipping;
            break;

          case 'square':
            shipping = 0.022 * this.quoteData.index.ishhiperFinalPrice;
            total = this.quoteData.index.ishhiperFinalPrice + shipping;
            break;

          case 'paypal':
            shipping = 0.0175 * this.quoteData.index.ishhiperFinalPrice + 0.3;
            total = this.quoteData.index.ishhiperFinalPrice + shipping;
            break;

          default:
            console.error('Invalid payment method');
            return; // Exit if an unknown payment method is found
        }

        // Update pay data with recalculated values
        this.updatedPayData = {
          payMethod: this.updatedPayData.payMethod,
          shipment: shipping,
          total: total,
          codeName:this.voucherCode,
          codeValid:false
        };

        this.removeEnable = false;
        this.deliveryDetailService.updatepayData(this.updatedPayData);
        console.log('Voucher code removed');
        this.toast.success('Voucher code removed successfully');
      } else {
        console.error(
          'No valid payment method found or updatedPayData is not initialized.'
        );
      }
    }
  }

  ngAfterViewInit() {
    console.log('Voucher code:', this.voucherCode);
    // You can now use voucherCode as needed in your code
  }
  fetchIshipperCalculation() {
    this.estimatedDate = this.quoteData.estimatedDate;

    this.getDataByIndex = this.quoteData.index;
    console.log('get data by index', this.getDataByIndex);

    console.log('check logo', this.getDataByIndex.logo);

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
