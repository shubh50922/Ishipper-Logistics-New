import { Component, OnInit } from '@angular/core';
import { stripe } from 'ngx-bootstrap-icons';
import { Router } from '@angular/router';
import { PaymentGatewayService } from 'src/app/services/payment-gateway.service';
import { IndexService } from 'src/app/core/services/index.service';
import { DeliveryDetailService } from 'src/app/core/services/delivery-detail.service';
import { MergeService } from 'src/app/core/services/merge.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HotToastService } from '@ngneat/hot-toast';
@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css'],
})
export class PaymentDetailsComponent implements OnInit {
  isModalOpen!: Boolean;
  method!: string;
  shipmentCost: any;
  isLoading: boolean = false;
  totalCost: any;
  quoteData: any;
  indexForm: any = {};
  orderForm: any = {};
  squareTotal: any;
  stripeTotal: any;
  paypalTotal: any;
  estimatedDateISO:any
  collectionDateISO:any
  itemsArray:any
  proceed: boolean = false;
  sessionId: any;
  fastCourierpostOrder: any;
  sendlePostOrder:any
  fastCourierbooktOrder: any;
  checkValues: any;
  promotionalCodeApplied!: boolean;
  processpayData: any;
 CourierPleaseShipmentResponse:any
 cpSingleBookPickupResponse:any
 splitedAddresses:any
 spliteddestinationAddresses:any
  constructor(
    private paymentGatewayService: PaymentGatewayService,
    private router: Router,
    private indexService: IndexService,
    private deliveryDetailService: DeliveryDetailService,
    private mergeService: MergeService,
    private toast : HotToastService
  ) {}

  ngOnInit(): void {
    this.subscribeToData()
    this.splitPickupAddress(this.orderForm.pickupAddress1)
    this.splitdestinationAddress(this.orderForm.destinationAddress1)
  }
  subscribeToData(){
    this.indexService.indexForm$.subscribe((res) => {
      console.log('indexForm data:', res);
      this.indexForm = res || {};
    });
this.itemsArray=this.indexForm.items
    this.deliveryDetailService.sharedData$.subscribe((res) => {
      console.log('orderForm data:', res);
      this.orderForm = res || {};
    });

    this.mergeService.quoteData$.subscribe((res) => {
      console.log('quoteData:', res);
      this.quoteData = res || {};
    });
    this.deliveryDetailService.payData$.subscribe((res) => {
      console.log('process payment', res);
      this.processpayData = res || {};
    });
    this.deliveryDetailService.checkValues$.subscribe((res) => {
      console.log('check values', res);
      this.checkValues = res || {};
    });
  }
  callThirdParty() {
    if (this.quoteData?.index?.responseType === 'fastCourier') {
      console.log("response type is fast courier");
      
      this.handleFastCourierOrder();
    } else if (this.quoteData?.index?.responseType === 'sendle') {
      console.log("response type is sendle");
      this.handleSendleOrder();
    }else if (this.quoteData?.index?.responseType === 'courierplease'&& this.itemsArray.length>1) {
      console.log("response type is courierplease");
      this.handleCourierPleaseMultipleItems();
    }else if (this.quoteData?.index?.responseType === 'courierplease'&& this.itemsArray.length==1) {
      console.log("response type is courierplease");
      this.handleCourierPleaseSingleItem();
    }
  }
  handleSendleOrder(){
    const itemsArray = this.indexForm.items;
    const saveOrder = {
      "senderContactName": this.orderForm.pickupFirstName + ' ' + this.orderForm.pickupLastName,
      "senderEmail": this.orderForm.pickupEmail,
      "senderPhone": this.orderForm.pickupPhone,
      "senderCompany": this.orderForm.pickupCompanyName||"null",
      "senderCountry": "AU",
      "senderAddressLine1":this.orderForm.pickupAddress1,
      "senderAddressLine2": this.orderForm.pickupAddress2,
      "senderSuburb": this.indexForm.fromSuburb,
      "senderPostcode": this.indexForm.fromCode,
      "senderStateName": this.indexForm.fromState,
      "senderInstructions": this.orderForm.pickupInstructions,
      "receiverContactName": this.orderForm.destinationFirstName + ' ' + this.orderForm.destinationLastName,
      "receiverEmail": this.orderForm.destinationEmail,
      "receiverPhone": this.orderForm.destinationPhone,
      "receiverCompany": this.orderForm.destinationCompanyName,
      "receiverCountry": "AU",
      "receiverAddressLine1": this.orderForm.destinationAddress1,
      "receiverAddressLine2": this.orderForm.destinationAddress2,
      "receiverSuburb": this.indexForm.toSuburb,
      "receiverPostcode": this.indexForm.toCode,
      "receiverStateName": this.indexForm.toState,
      "receiverInstructions":this.orderForm.destinationInstructions,
      "weightUnits": "kg",
      "weightValue": this.indexForm.weights,
      "dimensionUnits": "cm",
      "length": this.indexForm.lengths,
      "width":this.indexForm.widths,
      "height": this.indexForm.heights,
      "hidePickupAddress": false,
      "description": this.orderForm.specialInstructions,
      "customerReference": this.orderForm.reference,
      "pickupDate": this.indexForm.collectionDate,
      "packagingType": itemsArray && itemsArray.length > 0 ? itemsArray[0].type : null,
      "productCode":this.quoteData.index.productCode,
       "quotationId":this.quoteData.index.quotationId,
        "ishipperId":this.quoteData.index.ishipperId

    }

    if(saveOrder ){
       
      localStorage.setItem('sendle order', JSON.stringify(saveOrder));
      console.log("save order sendle",saveOrder);
      
      this.isLoading=true
      this.paymentGatewayService.sendleCreateOrder(saveOrder).subscribe((response:any)=>{
        if(response){
          this.isLoading=false
this.sendlePostOrder=response
localStorage.setItem('sendleResponse', JSON.stringify(this.sendlePostOrder));
console.log("sendle post order",this.sendlePostOrder);
if(response.message==="Order successfully booked."){
this.proceed = true;
if(this.proceed){
  this.paymentMethod()
}

}
        }
      },(error:any)=>{
        this.isLoading=false
        this.toast.error("error in booking order")
      }) 
    }
  }
  handleCourierPleaseSingleItem(){
const saveOrder={
  "accountName": "",
  "contactName": "John",
  "contactEmail": "rrr@gmail.com",
  "readyDateTime": this.indexForm.collectionDate + " " + this.convertTo12HourFormat(this.orderForm.readyTime),
  "specialInstructions":this.orderForm.specialInstructions,
  "consignmentCount": "1",
  "consignmentCode": "CPPLW9999999",
  "totalItemCount": "1",
  "totalWeight": this.itemsArray[0].weight,
  "pickup": {
    "phoneNumber": this.orderForm.pickupPhone,
    "companyName": this.orderForm.pickupCompanyName,
    "address1": this.splitedAddresses.address1,
    "address2": this.splitedAddresses.address2,
    "address3": "Level 2",
    "postcode": this.indexForm.fromCode,
    "suburb": this.indexForm.fromSuburb
  },
  "delivery": {
    "companyName": this.orderForm.destinationCompanyName,
    "address1": this.spliteddestinationAddresses.address1,
    "address2": this.spliteddestinationAddresses.address2,
    
    "postcode": this.indexForm.toCode,
    "suburb": this.indexForm.toSuburb
  },
  "quotationId": this.quoteData.index.quotationId,
  "ishipperId": this.quoteData.index.ishipperId
}
if(saveOrder){
  console.log("save order cp multiple",saveOrder);
  
  localStorage.setItem('cpMultiple', JSON.stringify(saveOrder));
  this.isLoading=true
  this.paymentGatewayService.createShipmentSingleCourierPlease(saveOrder).subscribe((response:any)=>{
    if(response){
      this.isLoading=false
      this.cpSingleBookPickupResponse=response
      console.log("create shipment cp single response",this.cpSingleBookPickupResponse);
      if(this.cpSingleBookPickupResponse.message=="Order created successfully"){
        this.proceed=true
        
      }
      if(this.proceed){
        this.paymentMethod()
      }
    }
  },(error:any)=>{
    this.isLoading=false
    this.toast.error("Error in creating courier please shipment")
  })
}
  }
handleCourierPleaseMultipleItems(){
  const itemsArray = this.indexForm.items;
  const saveOrder = {
    "pickupDeliveryChoiceID":  null,
    "pickupFirstName": this.orderForm.pickupFirstName,
    "pickupLastName": this.orderForm.pickupLastName,
    "pickupCompanyName":this.orderForm.pickupCompanyName,
    "pickupEmail": this.orderForm.pickupEmail,
    "pickupAddress1": this.orderForm.pickupAddress1,
    "pickupAddress2": this.orderForm.pickupAddress2,
    "pickupSuburb": this.indexForm.fromSuburb,
    "pickupState": this.indexForm.fromState,
    "pickupPostcode": this.indexForm.fromCode,
    "pickupPhone": this.orderForm.pickupPhone,
    "pickupIsBusiness": this.orderForm.pickupIsBusiness,
    "destinationDeliveryChoiceID": null,
    "destinationFirstName": this.orderForm.destinationFirstName,
    "destinationLastName": this.orderForm.destinationLastName,
    "destinationCompanyName":this.orderForm.destinationCompanyName,
    "destinationEmail": this.orderForm.destinationEmail,
    "destinationAddress1": this.orderForm.destinationAddress1,
    "destinationAddress2": this.orderForm.destinationAddress2,
    "destinationSuburb": this.indexForm.toSuburb,
    "destinationState": this.indexForm.toState,
    "destinationPostcode": this.indexForm.toCode,
    "destinationPhone": this.orderForm.destinationPhone,
    "destinationIsBusiness": this.orderForm.destinationIsBusiness,
    "contactFirstName": "Contact First",
    "contactLastName": "Contact Last",
    "contactCompanyName": "Contact Co.",
    "contactEmail": "contatctemail@test.com.au",
    "contactAddress1": "352 Contact St.",
    "contactAddress2": "",
    "contactSuburb": "Rosehill",
    "contactState": "NSW",
    "contactPostcode": "2142",
    "contactPhone": "1300 361 000",
    "contactIsBusiness": true,
    "referenceNumber": this.orderForm.reference,
    "termsAccepted": this.checkValues.acceptTermConditions,
    "dangerousGoods": this.checkValues.acceptNoDangerousGoods,
    "rateCardId": "L55",
    "specialInstruction": this.orderForm.specialInstructions,
    "isATL": this.orderForm.authorityToLeave,
    "readyDateTime": this.indexForm.collectionDate + " " + this.convertTo12HourFormat(this.orderForm.readyTime),
    "items": itemsArray.map((item:any) => ({
      type: item.type,
      weight: item.weight,
      length: item.length,
      width: item.width,
      height: item.height,
      quantity: item.quantity,
      contents: item.contents,
      physicalWeight: item.physicalWeight
    })),
    
    "quotationId": this.quoteData.index.quotationId,
    "ishipperId": this.quoteData.index.ishipperId
  }
  if(saveOrder){
    console.log("save order cp multiple",saveOrder);
    
    localStorage.setItem('cpMultiple', JSON.stringify(saveOrder));
    this.isLoading=true
    this.paymentGatewayService.createShipmentCourierPlease(saveOrder).subscribe((response:any)=>{
      if(response){
        this.isLoading=false
        this.CourierPleaseShipmentResponse=response
        console.log("create shipment cp response",this.CourierPleaseShipmentResponse);
        if(this.CourierPleaseShipmentResponse.message=="Order created successfully"){
          this.proceed=true
          
        }
        if(this.proceed){
          this.paymentMethod()
        }
      }
    },(error:any)=>{
      this.isLoading=false
      this.toast.error("Error in creating courier please shipment")
    })
  }
}
   
handleFastCourierOrder(){
  const saveOrder = {
    quoteId: this.quoteData.index.quoteId,
    senderType: 'sender',
    pickupFirstName: this.orderForm.pickupFirstName,
    pickupLastName: this.orderForm.pickupLastName,
    pickupCompanyName: this.orderForm.pickupCompanyName,
    pickupEmail: this.orderForm.pickupEmail,
    pickupAddress1: this.orderForm.pickupAddress1,

    pickupAddress2: this.orderForm.pickupAddress2,
    pickupPhone: this.orderForm.pickupPhone,
    destinationLastName: this.orderForm.destinationLastName,
    destinationFirstName: this.orderForm.destinationFirstName,
    destinationCompanyName: this.orderForm.destinationCompanyName,
    destinationEmail: this.orderForm.destinationEmail,
    destinationAddress1: this.orderForm.destinationAddress1,

    destinationAddress2: this.orderForm.destinationAddress2,
    destinationPhone: this.orderForm.destinationPhone,
    collectionDate: this.indexForm.collectionDate,
    pickupTimeWindow: this.orderForm.pickupTimeWindow,
    parcelContent: this.orderForm.parcelContent,
    specialInstructions: this.orderForm.specialInstructions,
    valueOfContent: 100,
    authorityToLeave: this.orderForm.authorityToLeave || true,
    noPrinter: false,
    extendedLiability: '1',
    insuranceValue: '$0',
    insuranceFee: '$0',
    acceptInsuranceConditions: this.checkValues.acceptInsuranceConditions,
    acceptTermConditions: this.checkValues.acceptTermConditions,
    acceptAttachment: this.checkValues.acceptAttachment,
    acceptNoDangerousGoods: this.checkValues.acceptNoDangerousGoods,
    acceptReadFinancialServiceGuide: true,
    emailForDocuments: 'support@ishipper.com.au',
    additionalEmailsForDocuments: [
      {
        email: 'support@ishipper.com.au',
      },
    ],
  };
 
  if (saveOrder) {
    localStorage.setItem('fast courier post order', JSON.stringify(saveOrder));
    localStorage.setItem('fcorderId', JSON.stringify(this.quoteData.index.orderId));
    console.log('save order', saveOrder);
this.isLoading=true
    this.mergeService
      .postSaveOrder(this.quoteData.index.orderId, saveOrder)
      .subscribe((response: any) => {
        if(response){
        
          this.isLoading=false
        }
        this.fastCourierpostOrder = response;
        localStorage.setItem('fcpostResponse', JSON.stringify(this.fastCourierpostOrder));
        console.log('fast courier post order', this.fastCourierpostOrder);
        
        const parsedContent = JSON.parse(this.fastCourierpostOrder.content);
       ;
        // Access the message property
        const message = parsedContent.message;
        console.log(message); // Output: success
        if (message === 'success') {
          this.isLoading = true;
          this.paymentGatewayService
            .bookOrderFastCourier(this.quoteData.index.orderId)
            .subscribe((response: any) => {
              if (response) {
                this.fastCourierbooktOrder = response;
                localStorage.setItem('fcBookResponse', JSON.stringify(this.fastCourierbooktOrder));
                console.log(
                  'fastCourierbookOrder',
                  this.fastCourierbooktOrder
                );
                if (
                  this.fastCourierbooktOrder.message ==
                  'Order successfully booked.'
                ) {
                  console.log('inside procceed true');

                  this.proceed = true;
                  if(this.proceed){
                    this.paymentMethod()
                  }
                
                }
              }
              
            },(error:any)=>{
              this.isLoading=false
              this.toast.error("error in booking order")
            }) 
          }
        });
        }
        error: (error: HttpErrorResponse) => {
          this.isLoading = false;
          console.error('Error during save order:', error);
  
          // Display toast for 500 Internal Server Error
          if (error.status === 500) {
            this.toast.error('Internal Server Error while saving order. Please try again later.');
          } else if (error.error && error.error.content) {
            try {
              const parsedErrorContent = JSON.parse(error.error.content);
              this.toast.error(parsedErrorContent.message);
            } catch (e) {
              console.error('Error parsing error content', e);
            }
          } else {
            this.toast.error('An error occurred while saving the order.');
          }
        }
      
    }
     splitPickupAddress(fullAddress:any) {
      fullAddress=this.orderForm.pickupAddress1
      const words = fullAddress.split(" ");
      let address1 = "";
      let address2 = "";
      
      for (let word of words) {
          // Check if adding the next word would exceed 19 characters for address1
          if ((address1 + word).length <= 19) {
              address1 += (address1 ? " " : "") + word;
          } else {
              // If address1 is full, start filling address2
              address2 += (address2 ? " " : "") + word;
          }
      }
   this.splitedAddresses={ address1, address2 }
  console.log("split address",this.splitedAddresses);
  
      return this.splitedAddresses;
  }
  splitdestinationAddress(fullAddress:any) {
    fullAddress=this.orderForm.destinationAddress1
    const words = fullAddress.split(" ");
    let address1 = "";
    let address2 = "";
    
    for (let word of words) {
        // Check if adding the next word would exceed 19 characters for address1
        if ((address1 + word).length <= 19) {
            address1 += (address1 ? " " : "") + word;
        } else {
            // If address1 is full, start filling address2
            address2 += (address2 ? " " : "") + word;
        }
    }
this.spliteddestinationAddresses={ address1, address2 }
console.log("split address",this.spliteddestinationAddresses);

    return this.spliteddestinationAddresses;
}
  setMethod(value: string) {
   
    this.method = value;
   if(this.method){
    localStorage.setItem('paymentMethod', JSON.stringify(this.method));
   }
    console.log('Payment method set to:', this.method); // Optional: For debugging

    // Payment method for Square
    if (this.method === 'square') {
      this.shipmentCost = 0.022 * this.quoteData.index.ishhiperFinalPrice;
      this.totalCost =
        this.quoteData.index.ishhiperFinalPrice + this.shipmentCost;
      this.squareTotal = this.totalCost;
      const payData = {
        shipment: this.shipmentCost,
        total: this.totalCost,
        payMethod: this.method,
      };

      // Update payment data if payData exists
      if (payData) {
        this.deliveryDetailService.updatepayData(payData);
      }

      console.log('shipment cost', this.shipmentCost);
      console.log('total cost', this.totalCost);
    }

    // Payment method for Stripe
    if (this.method === 'stripe') {
      this.shipmentCost = 0.017 * this.quoteData.index.ishhiperFinalPrice + 0.3;
      this.totalCost =
        this.quoteData.index.ishhiperFinalPrice + this.shipmentCost;
      this.stripeTotal = this.totalCost;
      console.log('stripe toatal', this.stripeTotal);

      const payData = {
        shipment: this.shipmentCost,
        total: this.totalCost,
        payMethod: this.method,
      };

      // Update payment data if payData exists
      if (payData) {
        this.deliveryDetailService.updatepayData(payData);
      }

      console.log('shipment cost', this.shipmentCost);
      console.log('total cost', this.totalCost);
    }

    // Payment method for PayPal
    if (this.method === 'paypal') {
      this.shipmentCost =
        0.0175 * this.quoteData.index.ishhiperFinalPrice + 0.3;
      this.totalCost =
        this.quoteData.index.ishhiperFinalPrice + this.shipmentCost;
      this.paypalTotal = this.totalCost;
      const payData = {
        shipment: this.shipmentCost,
        total: this.totalCost,
        payMethod: this.method,
      };

      // Update payment data if payData exists
      if (payData) {
        this.deliveryDetailService.updatepayData(payData);
      }

      console.log('shipment cost', this.shipmentCost);
      console.log('total cost', this.totalCost);
    }
  }
  convertTo12HourFormat(time: string): string {
    const [hour, minute] = this.orderForm.readyTime.split(':').map(Number);

    let ampm = 'AM';
    let convertedHour = hour;

    if (hour === 0) {
        convertedHour = 12;  // Midnight case
    } else if (hour >= 12) {
        ampm = 'PM';
        if (hour > 12) {
            convertedHour = hour - 12;
        }
    }

    // Add leading zeros to hour and minute if they are single digits
    const formattedHour = convertedHour.toString().padStart(2, '0');
    const formattedMinute = minute.toString().padStart(2, '0');

    return `${formattedHour}:${formattedMinute} ${ampm}`;
}

  paymentMethod() {
  
    if (this.method === 'square' && this.proceed===true) {
      const payload = {
        nonce: 'cnon:card-nonce-ok',
        amount: this.squareTotal,
        locationId: 'LARK7C8QEK3H4',
      };
      if (payload) {
        this.paymentGatewayService
          .squareIntegration(payload)
          .subscribe((response: any) => {
            console.log('redirect to square', response);
          });
      }
    }
    if (this.method === 'stripe' && this.proceed===true) {
      console.log('stripe toatal inside stripe', this.stripeTotal);
      const payload = {
        amount: parseFloat(this.stripeTotal.toFixed(2)),

        currency: 'aud',
        paymentMethodId: 'pm_card_visa',
      };
      if (payload ) {
        this.isLoading=true
        this.paymentGatewayService
          .stripeIntegration(payload)
          .subscribe((response: any) => {
           
            if (response && response.sessionURL) {
              debugger
              this.isLoading = false;
              this.sessionId = response.sessionId;
              const collectionDate = new Date(this.indexForm.collectionDate);
 const estimatedDate = new Date(this.quoteData.estimatedDate);

// Ensure both are valid Date objects before converting to ISO
if (!isNaN(collectionDate.getTime())) {
  const year = collectionDate.getFullYear();
const month = String(collectionDate.getMonth() + 1).padStart(2, '0'); // months are 0-based
const day = String(collectionDate.getDate()).padStart(2, '0');

// Manually format as 'YYYY-MM-DDTHH:mm:ss.sssZ'
this.collectionDateISO= `${year}-${month}-${day}T00:00:00.000Z`;
  
} else {
  console.error('Invalid collectionDate');
}

if (!isNaN(estimatedDate.getTime())) {
  const year = estimatedDate.getFullYear();
const month = String(estimatedDate.getMonth() + 1).padStart(2, '0'); // months are 0-based
const day = String(estimatedDate.getDate()).padStart(2, '0');

// Manually format as 'YYYY-MM-DDTHH:mm:ss.sssZ'
this.estimatedDateISO= `${year}-${month}-${day}T00:00:00.000Z`;
 
} else {
  console.error('Invalid estimatedDate');
}
debugger
              const data = {
                quotationId: this.quoteData.index.quotationId,
                userId: this.indexForm.createdby,
                ishipperId: this.quoteData.index.ishipperId,
                promotionalCodeApplied: this.processpayData.codeValid,
                codeName: this.processpayData.codeName || '',
                shippingCost: this.processpayData.shipment,
                finalPrice: this.processpayData.total,
                paymentSuccess: false,
                paymentMode: 'card',
                paymentType: this.processpayData.payMethod,
                paymentId: '',
                sessionId: this.sessionId,
                collectionDate:this.collectionDateISO,
                estimatedDate:this.estimatedDateISO

              };
              
              
              if (data) {
                debugger
                console.log("dataaaaaa",data);
                localStorage.setItem('process pay data', JSON.stringify(data));
                console.log('payment process data', data);
                this.paymentGatewayService
                  .postpaymentProcess(data)
                  .subscribe((response: any) => {
                    if (response) {
                      this.processpayData = response;
                      console.log('process pay data', response);
                      this.paymentGatewayService.updateprocesspaypayload(data);
                      this.paymentGatewayService.updateprocesspayresponse(
                        response
                      );
                    }
                  });
              }
              // Redirect to the session URL in the same tab
              window.location.href = response.sessionURL;
            }
            console.log('redirect to stripe', response);
          });
      }
    }
    if (this.method === 'paypal' && this.proceed===true) {
      const currency = 'AUD';

      this.paymentGatewayService
        .createOrderPaypal(this.paypalTotal, currency)
        .subscribe((response: any) => {
          if (response && response.approvalUrl) {
            this.isLoading = false;
            this.sessionId = response.token;
            const data = {
              quotationId: this.quoteData.index.quotationId,
              userId: this.indexForm.createdby,
              ishipperId: this.quoteData.index.ishipperId,
              promotionalCodeApplied: this.processpayData.codeValid,
              codeName: this.processpayData.codeName || '',
              shippingCost: this.processpayData.shipment,
              finalPrice: this.processpayData.total,
              paymentSuccess: false,
              paymentMode: 'card',
              paymentType: this.processpayData.payMethod,
              paymentId: '',
              sessionId: this.sessionId,
            };
            if (data) {
              localStorage.setItem('process pay data', JSON.stringify(data));
              console.log('payment process data', data);
              this.paymentGatewayService
                .postpaymentProcess(data)
                .subscribe((response: any) => {
                  if (response) {
                    this.processpayData = response;
                    console.log('process pay data', response);
                    this.paymentGatewayService.updateprocesspaypayload(data);
                    this.paymentGatewayService.updateprocesspayresponse(
                      response
                    );
                  }
                });
            }
            // Redirect to the session URL in the same tab
            window.location.href = response.approvalUrl;
          }
          console.log('redirect to paypal', response);
        });
    }
  }
}
  