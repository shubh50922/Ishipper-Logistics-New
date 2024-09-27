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
import { ToastrService } from 'ngx-toastr';
import { IndexService } from 'src/app/core/services/index.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { Router } from '@angular/router';
import { MergeService } from 'src/app/core/services/merge.service';
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
  estimatedDate: any;
  getQuoteById: any;
  formattedAddress1: any = '';
  formattedAddress2: any = '';
  formattedAddress3: any = '';
  formattedAddress4: any = '';
  savedCalculation: any;
  quoteData: any;
  ishipperCalculation: any;
  authorityStatus: any;
  isAuthorityToLeave: boolean = false;
  payload1: any;
  indexForm: any;
  Idorder!: string;
  orderForm!: FormGroup;
  Payload2: any;
  ContentList!: any[];
  options: Options = {
    bounds: null as unknown as LatLngBounds, // or use a specific LatLngBounds object
    types: [], // You can specify place types like ['address', 'establishment'] if needed
    fields: ['formatted_address', 'geometry', 'name'], // Specify fields you want to retrieve, e.g., ['formatted_address', 'geometry']
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
    } else {
      this.formattedAddress1 =
        this.formattedAddress2 =
        this.formattedAddress3 =
        this.formattedAddress4 =
          'a';
    }
  }

  public clearAddress(field: string) {
    if (field === 'formattedAddress1') {
      this.formattedAddress1 = '';
      if (this.placesRef1) {
        this.placesRef1.reset();
      }
    } else if (field === 'formattedAddress2') {
      this.formattedAddress2 = '';
      if (this.placesRef2) {
        this.placesRef2.reset();
      }
    } else if (field === 'formattedAddress3') {
      this.formattedAddress3 = '';
      if (this.placesRef3) {
        this.placesRef3.reset();
      }
    } else if (field === 'formattedAddress4') {
      this.formattedAddress4 = '';
      if (this.placesRef4) {
        this.placesRef4.reset();
      }
    }
  }

  constructor(
    private fb: FormBuilder,
    private deliveryDetailService: DeliveryDetailService,
    private toast: HotToastService,
    private toastrService: ToastrService,
    private indexService: IndexService,
    private sharedService: SharedService,
    private router: Router,

    private mergeService: MergeService
  ) {}

  ngOnInit(): void {
    this.orderForm = this.fb.group({
      quoteId: [''],
      senderType: ['sender', Validators.required],
      pickupFirstName: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z ]*$')],
      ],
      pickupLastName: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z ]*$')],
      ],
      pickupCompanyName: [''],
      pickupEmail: ['', [Validators.required, Validators.email]],
      pickupAddress1: ['', Validators.required],
      pickupAddress2: [''],
      pickupPhone: ['', Validators.required],
      destinationFirstName: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z ]*$')],
      ],
      destinationLastName: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z ]*$')],
      ],
      destinationCompanyName: [''],
      destinationEmail: ['', [Validators.required, Validators.email]],
      destinationAddress1: ['', Validators.required],
      destinationAddress2: ['', Validators.required],
      destinationPhone: ['', Validators.required],
      collectionDate: ['', Validators.required],
      pickupTimeWindow: ['9am to 5pm', Validators.required],
      parcelContent: ['alcohol', Validators.required],
      specialInstructions: [''],
      valueOfContent: [100, Validators.required],
      authorityToLeave: [Validators.required],
      noPrinter: [false, Validators.required],
      extendedLiability: ['1', Validators.required],
      insuranceValue: ['$500', Validators.required],
      insuranceFee: ['$4.00', Validators.required],
    });
    this.fetchIshipperCalculation();
    this.getContentListInDropdown();
  }
  fetchIshipperCalculation() {
    this.mergeService.quoteData$.subscribe((res) => {
      this.quoteData = res;
      console.log('quotedata', this.quoteData);
    });
    this.mergeService.ishipperCalculation$.subscribe((res) => {
      this.ishipperCalculation = res;
      console.log('ishipper calculation', this.ishipperCalculation);
    });
    this.estimatedDate = this.quoteData.estimatedDate;
    console.log('estimated date', this.estimatedDate);

    this.indexService.indexForm$.subscribe((res) => {
      this.indexForm = res;
    });
    this.getQuoteById = this.quoteData.index;
    console.log('get data by id', this.getQuoteById);

    console.log('check logo', this.getQuoteById.logo);
    this.checkResponseType();
    this.mergeService.ishipperCalculation$.subscribe((res) => {
      this.savedCalculation = res;
    });
    if (this.savedCalculation) {
      console.log('saved form response check', this.savedCalculation);

      this.orderForm.patchValue({
        quoteId: this.quoteData.index.quoteId,
      });
    }
    if (this.indexForm) {
      this.orderForm.patchValue({
        collectionDate: this.indexForm.collectionDate,
      });
    }
    console.log('saved calculation', this.savedCalculation);
    console.log('form value in delivery detail', this.indexForm);
  }
  checkResponseType() {
    const type = this.getQuoteById.responseType;
    console.log('response type check', type);
  }
  getContentListInDropdown() {
    this.indexService.getContentList().subscribe(
      (response: any) => {
        console.log('========------> ', response);
        this.ContentList = response.data; // Adjusted to match the actual response structure
        // this.cdr.detectChanges();
      },
      (error: any) => {
        this.toastrService.error('Error fetching content list');
      }
    );
  }
  authorityToLeave(event: any): void {
    this.isAuthorityToLeave = event.target.checked;
    this.authorityStatus = this.isAuthorityToLeave ? 'Yes' : 'No';
    if (this.authorityStatus) {
      this.orderForm.patchValue({
        authorityToLeave: this.authorityStatus,
      });
    }
  }
  onSubmit() {
    console.log('on submit called');
    console.log('mY FORM ', this.orderForm);

    if (this.orderForm.valid) {
      console.log('Form is valid');
      console.log('order form value', this.orderForm);

      this.deliveryDetailService.updatesharedData(this.orderForm.value);
      this.router.navigate(['/application/additional']);
    } else {
      console.log('Form is invalid');
      this.checkFormErrors();
      this.toast.error('Invalid form');
      const formdata = {
        quoteId: null,
        senderType: 'sender',
        pickupFirstName: 'aa',
        pickupLastName: 'ss',
        pickupCompanyName: 'asd',
        pickupEmail: 'aa@gmail.com',
        pickupAddress1:
          '20 Convention Centre Pl, South Wharf VIC 3006, Australia',
        pickupAddress2:
          '20 Convention Centre Pl, South Wharf VIC 3006, Australia',
        pickupPhone: '1231231232',
        destinationFirstName: 'aa',
        destinationLastName: 'ss',
        destinationCompanyName: 'asd',
        destinationEmail: 'aa@gmail.com',
        destinationAddress1: 'Spencer St, Docklands VIC 3008, Australia',
        destinationAddress2: '3-5 Underwood Rd, Homebush NSW 2140, Australia',
        destinationPhone: '1231231232',
        collectionDate: '2024-09-27',
        pickupTimeWindow: '5pm to 9am',
        parcelContent: 'alcohol',
        specialInstructions: 'asdasdasdad',
        valueOfContent: 100,
        noPrinter: false,
        extendedLiability: '1',
        insuranceValue: '$500',
        insuranceFee: '$4.00',
      };
      this.deliveryDetailService.updatesharedData(formdata);
      this.router.navigate(['/application/additional']);
    }
  }

  // Function to log errors
  checkFormErrors() {
    Object.keys(this.orderForm.controls).forEach((field) => {
      const control = this.orderForm.get(field);
      if (control?.invalid) {
        const errors = control.errors;
        console.log(`Field ${field} has errors:`, errors);
      }
    });
  }
}
