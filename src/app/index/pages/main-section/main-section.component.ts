import { Component, OnInit } from '@angular/core';
import { IndexService } from 'src/app/core/services/index.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormArray,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { HotToastService } from '@ngneat/hot-toast';
import { TrackOrderService } from 'src/app/core/services/track-order.service';
@Component({
  selector: 'app-main-section',
  templateUrl: './main-section.component.html',
  styleUrls: ['./main-section.component.css'],
})
export class MainSectionComponent implements OnInit {
  fastCourierQuotes!: any[];
  errorMessage: any;
  trackForm!: FormGroup;
  viewOrders: any;
  trackOrderResponse: any;
  isLoading: boolean = false;
  Countries!: any[];
  ContentList: any[] = [];
  isInternational: boolean = true;
  isPickupResedential: boolean = false;
  isDestinationResedential: boolean = false;
  isPickupCommercial: boolean = true;
  isDestinationCommercial: boolean = true;
  selectedCountry: string = '';
  selectedOption: string = '';
  selectedCountryCode: string = ''; // Declare and initialize the variable
  collectionSuburbOrPostcode: string = '';
  DeliverySuburbOrPostcode: string = '';
  DisplayCountryCode: string = '';
  SubburbData: any = {};
  isLoadingOne: boolean = false; // Loader property for first input
  isLoadingTwo: boolean = false; // Loader property for second input
  userForm!: FormGroup;
  searchTextOne: string = '';
  searchTextTwo: string = '';
  isShowDropdownOne: boolean = false;
  isShowDropdownTwo: boolean = false;
  filteredSuburbsOne: any[] = [];
  filteredSuburbsTwo: any[] = [];
  result: any;
  selectedTravelType: string = 'international';
  selectedaddresstype: string = 'commercial';
  suburbNameOne!: string;
  suburbStateOne!: string;
  suburbPostCodeOne!: string;
  suburbNameTwo!: string;
  suburbStateTwo!: string;
  suburbPostCodeTwo!: string;
  searchArray1!: any[];
  searchArray2!: any[];
  GetRes: boolean = true;
  packagingType!: any[];
  today!: string;
  tailInfo:boolean=false
poInfo:boolean=false
  successMessage: boolean = false;
pTail:boolean=false
dTail:boolean=false
dBox:boolean=false
  weightType!: any[];
  minDate!: string;
  getWeights!: string;
  getHeights!: string;
  getLengths!: string;
  getWidths!: string;
  userId!: string;
  dimensions!: any[];
  userInput: string = '';
  private searchSubject = new Subject<string>();

  constructor(
    private fb: FormBuilder,
    private indexService: IndexService,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    private toast: HotToastService,
    private router: Router,
    private trackOrderService: TrackOrderService
  ) {}
  clearSearch(field: string): void {
    if (field === 'one') {
      this.searchTextOne = '';
      this.isShowDropdownOne = false; // Hide the dropdown when clearing the search
    } else if (field === 'two') {
      this.searchTextTwo = '';
      this.isShowDropdownTwo = false; // Hide the dropdown for the second input
    }
  }
  getDAte() {
    const changeDate = this.userForm.get('collectionDate')?.value;
    console.log('date', changeDate);
  }
  ngOnInit(): void {
    this.trackForm = this.fb.group({
      orderId: ['', Validators.required],
    });
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    this.minDate = `${year}-${month}-${day}`;

    // console.log('calender date disable', this.minDate);
    this.getUserId();
    this.getCountryInDropdown();

    this.getPackagingTypeDropdown();
    
    this.userForm = this.fb.group({
      fromSuburb: ['', Validators.required],
      fromCode: ['', Validators.required],
      fromState: ['', Validators.required],
      toSuburb: ['', Validators.required],
      toCode: ['', Validators.required],
      toState: ['', Validators.required],
      countryCode: ['AU', Validators.required],
      itemType: ['other', Validators.required],
      weightType: ['kg', Validators.required],
      weights: ['', Validators.required],
      lengths: ['', Validators.required],
      heights: ['', Validators.required],
      widths: ['', Validators.required],
      dimensionUnits: ['in', Validators.required],
      packageType: ['other', Validators.required],
      contents: ['other', Validators.required],
      collectionDate: ['', Validators.required],
      quantitys: [1],
      items: new FormArray([this.createItem()]),
      createdby: [this.userId],
      pickUpBuildingType: ['commercial'],
      destinationBuildingType: ['commercial'],
      isPickupTailLift:[true],
      isDropOffTailLift:[true],
      isDropOffPOBox:[true]
    });
    // console.log(this.userForm.get('items') as FormArray);
    // this.addItem();
    this.patchInitialFormValues();
  }
  createItem(): FormGroup {
    

    return this.fb.group({
      type: ['', Validators.required],
      weight: ['', Validators.required],
      length: ['', Validators.required],
      width: ['', Validators.required],
      height: ['', Validators.required],
      quantity: ['1', Validators.required],
      contents: ['other', Validators.required],
      physicalWeight: ['10', Validators.required],
    });
  }
  get items(): FormArray {
    return this.userForm.get('items') as FormArray;
  }
  pickupTail(event: any): void {
    this.pTail = event.target.checked;
    this.userForm.patchValue({
      isPickupTailLift : this.pTail  // Update form control with true/false
    });
  }
  deliveryTail(event: any): void {
    this.dTail = event.target.checked;
    this.userForm.patchValue({
      isDropOffTailLift : this.dTail  // Update form control with true/false
    });
  }
  deliveryPoBox(event: any): void {
    this.dBox = event.target.checked;
    this.userForm.patchValue({
      isDropOffPOBox : this.dBox  // Update form control with true/false
    });
  }
  addItem(): void {
    this.items.push(this.createItem());
  }
  trackOrder() {
    this.viewOrders = this.trackForm.value;
    console.log('view orders', this.viewOrders);
    const orderId = this.trackForm.get('orderId')?.value;
    console.log('Order ID:', orderId);
    if (orderId) {
      this.isLoading = true;
      this.errorMessage = '';
      this.poInfo=false
      this.tailInfo=false
      this.trackOrderService.trackOrder(orderId).subscribe(
        (response: any) => {
          this.isLoading = false;
          this.trackOrderResponse = response;
          if (this.trackOrderResponse) {
            this.successMessage = true;
          }

          console.log('track order response', this.trackOrderResponse);
        },
        (error: any) => {
         
          console.log('error', error);
          this.successMessage = false;
          this.poInfo=false
          this.tailInfo=false
          this.isLoading = false;
          // this.handleError(error);

          this.errorMessage = error.error.message;
        }
      );
    }
  }
  displayTailInfo(){
    console.log("tail info");
    this.poInfo=false
    this.successMessage = false
    this.errorMessage=''
    this.tailInfo=true

   
  }
  displayPoInfo(){
    this.successMessage = false
    this.errorMessage=''
    this.poInfo=true
    this.tailInfo=false
  }
  handleError(error: any) {
    console.error('Error occurred:', error);

    if (error.error) {
      // Check if the backend sent an error message
      if (error.error.message) {
        this.errorMessage = error.error.message; // Use backend-provided error message
      } else {
        this.errorMessage =
          'An unknown error occurred. Please try again later.'; // Fallback if no message
      }
    } else if (error.status === 0) {
      // Handle network errors (CORS, offline, etc.)
      this.errorMessage =
        'Network error: Please check your internet connection.';
    } else if (error.status >= 500) {
      // Server errors
      this.errorMessage = 'Server error: Please try again later.';
    } else if (error.status >= 400) {
      // Client errors (4xx range)
      this.errorMessage =
        'Invalid request: Please check the order details and try again.';
    } else {
      // Unexpected errors
      this.errorMessage =
        'An unexpected error occurred. Please contact support.';
    }
  }
  patchInitialFormValues(): void {
    this.userForm.patchValue({
      fromSuburb: this.suburbNameOne,
      fromState: this.suburbStateOne,
      fromCode: this.suburbPostCodeOne,
    });
    this.userForm.patchValue({
      toSuburb: this.suburbNameTwo,
      toState: this.suburbStateTwo,
      toCode: this.suburbPostCodeTwo,
    });
    // this.addItem(); // Ensure at least one item is added initially
  }

  getformControls() {
   
    const formValue = this.userForm.value;
    
    return formValue;
  }


  getUserId() {
    const getUser: any = localStorage.getItem('user');
    if(getUser){
 //  console.log("get user in index", getUser);
 const decryptUser = this.authService.decrypt(getUser);
 //  console.log("decrypt user in index",decryptUser);
 const userData = JSON.parse(decryptUser);
 //  console.log("parsed data in add user",userData);
 this.userId = userData.user.id;
 console.log('user id in index', this.userId);
    }
   
  }
  getDimensions() {
    // Get the FormArray
    const itemsArray = this.userForm.get('items') as FormArray;

    // Check if there are any items in the array
    if (itemsArray.length > 0) {
      // Get the first item group
      const firstItemGroup = itemsArray.at(0) as FormGroup;

      // Extract the dimensions from the first item group
      this.getLengths = firstItemGroup.get('length')?.value;
      this.getWidths = firstItemGroup.get('width')?.value;
      this.getHeights = firstItemGroup.get('height')?.value;
      this.getWeights = firstItemGroup.get('weight')?.value;
      const changeDate = this.userForm.get('collectionDate')?.value;
      console.log('date', changeDate);

      // Log the dimensions
      console.log(
        `Dimensions - Length: ${this.getLengths}, Width: ${this.getWidths}, Height: ${this.getHeights}`
      );

      // Update userForm with the extracted values

      this.userForm.patchValue({
        weights: this.getWeights,
        heights: this.getHeights,
        lengths: this.getLengths,
        widths: this.getWidths,
      });
    } else {
      // Handle the case where there are no items in the FormArray
      console.log('No items in the FormArray');
    }

    console.log('getDimensions called');
  }

  

  getPackagingTypeDropdown() {
    this.indexService.getPackagingType().subscribe((response: any) => {
      // console.log('packagingtype', response);
      this.packagingType = response;
      // console.log('', this.userForm.get('items')?.value);
    });
  }

  getCountryInDropdown() {
    this.indexService.getCountries().subscribe((data: any[]) => {
      this.Countries = data;
      // console.log('data from api', this.Countries);
    });
  }
  getPackagingTypeInDropdown() {
    this.indexService.getPackagingType().subscribe((response: any) => {
      this.packagingType = response;
    });
  }
  toggleDropdown(isInternational: boolean): void {
    this.isInternational = isInternational;
  }
  postRadioValue(iscommercial: boolean): void {
    this.isPickupCommercial = iscommercial;
    if (this.isPickupCommercial == true) {
      const value = 'commercial';
      this.userForm.patchValue({
        pickUpBuildingType: value,
      });
    } else {
      const value = 'resedential';
      this.userForm.patchValue({
        pickUpBuildingType: value,
      });
    }
    console.log(this.isPickupCommercial,"pickup");

    //  this.indexService.toggleRadio(this.isCommercial)
    this.indexService.isPickupCommercial$.next(this.isPickupCommercial);
    this.indexService.isPickupResidential$.next(this.isPickupResedential);
  }
  destinationRadioValue(iscommercial: boolean): void {
    this.isDestinationCommercial = iscommercial;
    if (this.isDestinationCommercial == true) {
      const value = 'commercial';
      this.userForm.patchValue({
        destinationBuildingType  : value,
      });
    } else {
      const value = 'resedential';
      this.userForm.patchValue({
        destinationBuildingType: value,
      });
    }
    console.log("destination",this.isDestinationCommercial);

    //  this.indexService.toggleRadio(this.isDestinationCommercial)
    this.indexService.isDestinationCommercial$.next(this.isDestinationCommercial);
    this.indexService.isDestinationResidential$.next(this.isDestinationResedential);
  }
  updateCountryCode(event: Event) {
    const selectElementValue = event.target as HTMLSelectElement;
    this.DisplayCountryCode = selectElementValue.value;
  }

  selectCountryToFetchCode(countryCode: string) {
    const selectedCountryName = this.Countries.find(
      (country) => country.countryCode === countryCode
    );
    if (selectedCountryName) {
      this.selectedCountryCode = selectedCountryName.countryCode;
      this.selectedCountry = selectedCountryName.countryName;
    }
  }
  getWeight() {}
  getInputValue(event: Event, dropdown: string) {
    const inputValue = (event.target as HTMLInputElement).value;
    if (dropdown === 'one') {
      this.searchTextOne = inputValue;
      if (this.searchTextOne.length >= 3) {
        this.getSubvurbs(this.searchTextOne, 'one');
      } else {
        this.isShowDropdownOne = false;
      }
    } else if (dropdown === 'two') {
      this.searchTextTwo = inputValue;
      if (this.searchTextTwo.length >= 3) {
        this.getSubvurbs(this.searchTextTwo, 'two');
      } else {
        this.isShowDropdownTwo = false;
      }
    }
  }

  getSubvurbs(input: any, dropdown: string) {
    if (dropdown === 'one') {
      this.isLoadingOne = true; // Start loading for first input
    } else if (dropdown === 'two') {
      this.isLoadingTwo = true; // Start loading for second input
    }
    this.indexService.getCountrySubvurbs(input).subscribe(
      (response: any) => {
        if (dropdown === 'one') {
          this.filteredSuburbsOne = response.data;
          if (this.filteredSuburbsOne.length === 0) {
            this.toast.error('Please enter valid subvurb or city');
          }
          this.isShowDropdownOne = true;
          this.isLoadingOne = false; // Stop loading for first input
        } else if (dropdown === 'two') {
          this.filteredSuburbsTwo = response.data;
          if (this.filteredSuburbsTwo.length === 0) {
            this.toast.error('Please enter valid subvurb or city');
          }
          this.isShowDropdownTwo = true;
          this.isLoadingTwo = false; // Stop loading for second input
        }
      },
      (error: any) => {
        // console.error('Error fetching suburbs:', error);
        if (dropdown === 'one') {
          this.isLoadingOne = false; // Stop loading in case of error for first input
        } else if (dropdown === 'two') {
          this.isLoadingTwo = false; // Stop loading in case of error for second input
        }
      }
    );
  }

  selectSuburb(suburb: any, dropdown: string) {
    const combinedSuburbValue = `${suburb.name} ${suburb.state} ${suburb.postcode}`;

    if (dropdown === 'one') {
      this.suburbNameOne = suburb.name;
      this.suburbPostCodeOne = suburb.postcode;
      this.suburbStateOne = suburb.state;
      this.searchTextOne = combinedSuburbValue;

      this.userForm.patchValue({
        fromSuburb: this.suburbNameOne,
        fromState: this.suburbStateOne,
        fromCode: this.suburbPostCodeOne,
      });
      // Hide the dropdown
      this.isShowDropdownOne = false;
      // console.log('From ', this.suburbNameOne);
    } else if (dropdown === 'two') {
      this.suburbNameTwo = suburb.name;
      this.suburbPostCodeTwo = suburb.postcode;
      this.suburbStateTwo = suburb.state;
      this.searchTextTwo = combinedSuburbValue;
      this.isShowDropdownTwo = false;

      this.userForm.patchValue({
        toSuburb: this.suburbNameTwo,
        toState: this.suburbStateTwo,
        toCode: this.suburbPostCodeTwo,
      });
      // Hide the dropdown
      this.isShowDropdownTwo = false;
      // console.log('To ', this.suburbNameTwo);
    }
  }
  removeItem(index: number): void {
    this.items.removeAt(index);
  }

  patchphysicalWeight(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.userInput = inputElement.value;
    console.log('Physical weight fetched:', this.userInput);

    const itemsArray = this.userForm.get('items') as FormArray;
    console.log('Items array:', itemsArray);

    for (let i = 0; i < itemsArray.length; i++) {
      const itemGroup = itemsArray.at(i) as FormGroup; // Correctly cast to FormGroup
      console.log('Item group:', itemGroup);

      itemGroup.patchValue({
        physicalWeight: this.userInput,
      });
    }
  }

  submitForm() {
    this.getDimensions();
    if (this.userForm.invalid) {
      // Mark all controls as touched to trigger validation messages
      this.userForm.markAllAsTouched();
      console.log('Form is invalid');
      return; // Stop submission if the form is invalid
    }
    console.log('weight in submit', this.getWeights);

    // if (this.userForm.invalid) {
    //   this.userForm.markAllAsTouched(); // Mark all fields as touched to trigger validation messages
    //   return;
    // }
    const payload = {
      items: this.userForm.value.items,
    };

    if (!this.GetRes) {
    } else if (this.GetRes) {
      
      console.log('userform', this.userForm.value);

      this.indexService.updateIndexForm(this.userForm.value);
      // localStorage.setItem('formValue', JSON.stringify(this.userForm.value));
      this.isLoading = true;
      this.indexService.postMergeQuotes(this.userForm.value).subscribe(
        (response: any) => {
          if (response) console.log('response from index', response);
          this.fastCourierQuotes = response.fastCourierResponse.data;
          console.log(
            'response from fastCourierResponse',
            this.fastCourierQuotes
          );

          this.router.navigate(['/application/replica']);
          this.isLoading = false;
          
          {
            const quotes = response;
            console.log('quotes', response);
            if (quotes) {
              localStorage.setItem(
                'quoteid',
                JSON.stringify(response.userData.quptationId)
              );
              localStorage.setItem(
                'userid',
                JSON.stringify(response.userData.userId)
              );
            
              this.indexService.mergeResponse$.next(response.userData);
            }
          }
        },
        (error: any) => {
          this.isLoading = false;
         
        }
      );
    }
  }
}
