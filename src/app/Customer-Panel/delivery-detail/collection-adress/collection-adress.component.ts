import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { ComponentRestrictions } from 'ngx-google-places-autocomplete/objects/options/componentRestrictions';
import { Options } from 'ngx-google-places-autocomplete/objects/options/options';
import { DeliveryDetailService } from 'src/app/core/services/delivery-detail.service';
import { LatLngBounds } from 'ngx-google-places-autocomplete/objects/latLngBounds';
import { LatLng } from 'ngx-google-places-autocomplete/objects/latLng';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
@Component({
  selector: 'app-collection-adress',
  templateUrl: './collection-adress.component.html',
  styleUrls: ['./collection-adress.component.css'],
})
export class CollectionAdressComponent implements OnInit {
  @ViewChild('placesRef1') placesRef1!: GooglePlaceDirective;

  @ViewChild('placesRef2') placesRef2!: GooglePlaceDirective;
  @ViewChild('placesRef3') placesRef3!: GooglePlaceDirective;
  @ViewChild('placesRef4') placesRef4!: GooglePlaceDirective;
  formattedAddress1: any = '';
  formattedAddress2: any = '';
  formattedAddress3: any = '';
  formattedAddress4: any = '';
  savedCalculation: any;
  indexForm: any;
  Idorder!: string;
  orderForm!: FormGroup;
  options: Options = {
    bounds: null as unknown as LatLngBounds, // or use a specific LatLngBounds object
    types: [], // You can specify place types like ['address', 'establishment'] if needed
    fields: [], // Specify fields you want to retrieve, e.g., ['formatted_address', 'geometry']
    strictBounds: false, // Keep as false if you want to allow results outside the bounds
    origin: null as unknown as LatLng, // or use a specific LatLng object if needed
    componentRestrictions: { country: 'AU' }, // Restrict to Australia
  };

  public handleAddressChange(address: any, field: string) {
    if (field == 'formattedAddress1') {
      this.formattedAddress1 = address.formatted_address;
    } else if (field == 'formattedAddress2') {
      this.formattedAddress2 = address.formatted_address;
    } else if (field == 'formattedAddress3') {
      this.formattedAddress3 = address.formatted_address;
    } else if (field == 'formattedAddress4') {
      this.formattedAddress4 = address.formatted_address;
    }
  }
  public clearAddresses() {
    this.formattedAddress1 = '';
    this.formattedAddress2 = '';
    this.formattedAddress3 = '';
    this.formattedAddress4 = '';
    if (this.placesRef1) {
      this.placesRef1.reset(); // Clear the input field in ngx-google-places-autocomplete
    }
    if (this.placesRef2) {
      this.placesRef2.reset(); // Clear the input field in ngx-google-places-autocomplete
    }
    if (this.placesRef3) {
      this.placesRef3.reset();
    }
    if (this.placesRef4) {
      this.placesRef4.reset();
    }
  }
  constructor(
    private fb: FormBuilder,
    private deliveryDetailService: DeliveryDetailService,
    private toast: HotToastService
  ) {}

  ngOnInit(): void {
    this.orderForm = this.fb.group({
      quoteId: [''],
      senderType: ['sender'],
      pickupFirstName: [''],
      pickupLastName: [''],
      pickupCompanyName: [''],
      pickupEmail: [''],
      pickupAddress1: [''],
      pickupAddress2: [''],
      pickupPhone: [''],
      destinationFirstName: [''],
      destinationLastName: [''],
      destinationCompanyName: [''],
      destinationEmail: [''],
      destinationAddress1: [''],
      destinationAddress2: [''],
      destinationPhone: [''],
      collectionDate: [''],
      pickupTimeWindow: [''],
      parcelContent: [''],
      specialInstructions: [''],
      valueOfContent: [100],
      authorityToLeave: [false],
      noPrinter: [false],
      extendedLiability: ['1'],
      insuranceValue: ['$500'],
      insuranceFee: ['$4.00'],
      acceptInsuranceConditions: [true],
      acceptTermConditions: true,
      acceptAttachment: true,
      acceptNoDangerousGoods: true,
      acceptReadFinancialServiceGuide: true,
      emailForDocuments: ['john@gmail.com'],
      additionalEmailsForDocuments: this.fb.array([
        this.createAdditionalEmail(),
      ]),
    });
    this.fetchIshipperCalculation();
  }
  fetchIshipperCalculation() {
    this.indexForm = JSON.parse(localStorage.getItem('formValue') || '');
    this.savedCalculation = JSON.parse(
      localStorage.getItem('fetchcalculation') || '{}'
    );
    if (this.savedCalculation) {
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
  createAdditionalEmail(): FormGroup {
    return this.fb.group({
      email: ['john@gmail.com', [Validators.required, Validators.email]],
    });
  }

  get additionalEmailsForDocuments(): FormArray {
    return this.orderForm.get('additionalEmailsForDocuments') as FormArray;
  }

  addAdditionalEmail() {
    this.additionalEmailsForDocuments.push(this.createAdditionalEmail());
  }

  removeAdditionalEmail(index: number) {
    this.additionalEmailsForDocuments.removeAt(index);
  }
  onSubmit() {
    this.Idorder = this.savedCalculation.orderId;
    if (this.orderForm.valid) {
      this.deliveryDetailService
        .saveOrder(this.orderForm.value, this.Idorder)
        .subscribe((response: any) => {
          this.toast.success('Data saved successfully!')
          console.log('response after book', response);
        },(error:any)=>{
          this.toast.error('Failed to save data')
        });
      console.log('Form Submitted:', this.orderForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
