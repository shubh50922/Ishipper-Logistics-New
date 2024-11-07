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
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-collection-adress',
  templateUrl: './collection-adress.component.html',
  styleUrls: ['./collection-adress.component.css'],
  providers: [DatePipe]
})
export class CollectionAdressComponent implements OnInit {
  @ViewChild('placesRef1') placesRef1!: GooglePlaceDirective;

 
  @ViewChild('placesRef3') placesRef3!: GooglePlaceDirective;
  formattedCollectionDate: any;
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
  pickupStatus:any
  destinationStatus:any
  isAuthorityToLeave: boolean = false;
  payload1: any;
  indexForm: any;
  Idorder!: string;
  orderForm!: FormGroup;
  Payload2: any;
  addressValidation:any
  rType:any
  isCp:any
  estimatedinHtml:any
  collectioninHtml:any
  isPickupBusiness:any
  isdestinationBusiness:boolean=false
  isDestinationBusiness:boolean=false
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
      console.log("formatted address 1", this.formattedAddress1);
      
      if (this.formattedAddress1.length > 40) {
        // Find the nearest space before the 40th character
        const splitIndex = this.formattedAddress1.lastIndexOf(' ', 40);
        const firstPart = this.formattedAddress1.substring(0, splitIndex);
        const secondPart = this.formattedAddress1.substring(splitIndex + 1);
        
        this.formattedAddress1 = firstPart; // Address 1 contains the first part
        this.formattedAddress2 = secondPart; // Address 2 contains the second part
      } else {
        this.formattedAddress2 = ''; // Clear Address 2 if Address 1 is less than 40 characters
      }
      if(this.formattedAddress1){
        console.log("checking payload",this.formattedAddress1,this.indexForm.fromSuburb,this.indexForm.fromState);
        
        this.deliveryDetailService.validateAddress(this.formattedAddress1,this.indexForm.fromCode,this.indexForm.fromState) .pipe(
          catchError((error: HttpErrorResponse) => {
            // Handle the error response here
            if (error.status === 400) {
              console.log("Check address:", error.error.isValid);  // Access isValid from error object
              this.toast.error(error.error.message)
            }
            console.error('Error Status:', error.status);
            console.error('Error Message:', error.message);
        
            return throwError(() => new Error('Address validation failed'));
          })
        ).subscribe((response:any)=>{
       if(response)
         console.log("address validation",response);
         
        })
      }
    } 
      // Validate Address 1 as you had before
      else if (field == 'formattedAddress3') {
      this.formattedAddress3=address.formatted_address
      console.log("formatted address 3",this.formattedAddress3);
      if(this.formattedAddress3.length>40){
        const splitIndex = this.formattedAddress3.lastIndexOf(' ', 40);
        const firstPart = this.formattedAddress3.substring(0, splitIndex);
        const secondPart = this.formattedAddress3.substring(splitIndex + 1);
        
        this.formattedAddress3 = firstPart; // Address 1 contains the first part
        this.formattedAddress4 = secondPart; // Address 2 contains the second part
      } else {
        this.formattedAddress4 = ''; // Clear Address 2 if Address 1 is less than 40 characters
      }
    
  

  if(this.formattedAddress3){
    this.deliveryDetailService.validateAddress(this.formattedAddress3,this.indexForm.toCode,this.indexForm.toState).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle the error response here
        if (error.status === 400) {
          console.log("Check address:", error.error.isValid);  // Access isValid from error object
          this.toast.error(error.error.message)
        }
        console.error('Error Status:', error.status);
        console.error('Error Message:', error.message);
    
        return throwError(() => new Error('Address validation failed'));
      })
    ).subscribe((response:any)=>{
     
     console.log("address validation",response);
     
    })
  }
} 
     else {
      this.formattedAddress1 =
       
        this.formattedAddress3 ='a'
       
    }
}

  public clearAddress(field: string) {
    if (field === 'formattedAddress1') {
      this.formattedAddress1 = '';
      if (this.placesRef1) {
        this.placesRef1.reset();
      }
    
    } else if (field === 'formattedAddress3') {
      this.formattedAddress3 = '';
      if (this.placesRef3) {
        this.placesRef3.reset();
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
    private datePipe: DatePipe,
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
      pickupInstructions:[''],
     destinationInstructions:[''],
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
      reference:['',Validators.required],
      readyTime: [''],
      pickupIsBusiness:[],
      destinationIsBusiness:[]
      
      
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
    this.estimatedinHtml=this.convertEstimatedDate(this.estimatedDate)
    this.indexService.indexForm$.subscribe((res) => {
      this.indexForm = res;
      
    });
    this.getQuoteById = this.quoteData.index;
    console.log('get data by id', this.getQuoteById);
this.collectioninHtml=this.convertCollectionDate(this.indexForm.collectionDate)
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
    if (type=="sendle"){
      this.rType=true
      }
      if(type=="courierplease"){
this.isCp=true
      }
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
  // authorityToLeave(event: any): void {
  //   this.isAuthorityToLeave = event.target.checked;
  //   this.authorityStatus = this.isAuthorityToLeave ? true : false;
  //   if (this.authorityStatus) {
  //     this.orderForm.patchValue({
  //       authorityToLeave: this.authorityStatus,
  //     });
  //   }
  // }
  // pickupIsBusiness(event: any): void {
  //   this.isPickupBusiness = event.target.checked;
  //   this. pickupStatus = this.isPickupBusiness ? true : false;
  //   if (this.pickupStatus) {
  //     this.orderForm.patchValue({
  //       pickupIsBusiness: this.pickupStatus,
  //     });
  //   }
  // }
  // destinationIsBusiness(event: any): void {
  //   this.isdestinationBusiness = event.target.checked;
  //   this. destinationStatus = this.isdestinationBusiness ? true : false;
  //   if (this.destinationStatus) {
  //     this.orderForm.patchValue({
  //       destinationIsBusiness: this.destinationStatus,
  //     });
  //   }
  // }
  authorityToLeave(event: any): void {
  this.isAuthorityToLeave = event.target.checked;
  this.orderForm.patchValue({
    authorityToLeave: this.isAuthorityToLeave  // Update form control with true/false
  });
}
convertEstimatedDate(date: any): string {
  // Ensure the 'date' is a valid Date object before processing
  if (!date || isNaN(new Date(date).getTime())) {
    console.error('Invalid date provided');
    return '';
  }

  // Use DatePipe to transform the date into the desired format
  const year = this.datePipe.transform(date, 'yyyy');  // full year (e.g., 2024)
  const day = this.datePipe.transform(date, 'dd');     // 2-digit day (e.g., 23)
  const month = this.datePipe.transform(date, 'MM'); // full month name (e.g., October)

  // Return the formatted date string
  this.formattedCollectionDate = `${year}-${month}-${day}`;
  
  return this.formattedCollectionDate;
}
convertCollectionDate(date: any): string {
  // Ensure the 'date' is a valid Date object before processing
  if (!date || isNaN(new Date(date).getTime())) {
    console.error('Invalid date provided');
    return '';
  }

  // Use DatePipe to transform the date into the desired format
  const year = this.datePipe.transform(date, 'yyyy');  // full year (e.g., 2024)
  const day = this.datePipe.transform(date, 'dd');     // 2-digit day (e.g., 23)
  const month = this.datePipe.transform(date, 'MMMM'); // full month name (e.g., October)

  // Return the formatted date string
  this.formattedCollectionDate = `${year}, ${month} ${day}`;
  
  return this.formattedCollectionDate;
}
pickupIsBusiness(event: any): void {
  this.isPickupBusiness = event.target.checked;
  this.orderForm.patchValue({
    pickupIsBusiness: this.isPickupBusiness  // Update form control with true/false
  });
}

destinationIsBusiness(event: any): void {
  this.isdestinationBusiness = event.target.checked;
  this.orderForm.patchValue({
    destinationIsBusiness: this.isdestinationBusiness  // Update form control with true/false
  });
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
        pickupPhone: '12312312',
        destinationFirstName: 'aa',
        destinationLastName: 'ss',
        destinationCompanyName: 'asd',
        destinationEmail: 'aa@gmail.com',
        destinationAddress1: 'Spencer St, Docklands VIC 3008, Australia',
        destinationAddress2: '3-5 Underwood Rd, Homebush NSW 2140, Australia',
        destinationPhone: '12312312',
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
