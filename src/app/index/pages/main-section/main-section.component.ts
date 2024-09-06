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
@Component({
  selector: 'app-main-section',
  templateUrl: './main-section.component.html',
  styleUrls: ['./main-section.component.css'],
})
export class MainSectionComponent implements OnInit {
  fastCourierQuotes!:any[]
  isLoading: boolean = false;
  Countries!: any[];
  ContentList: any[] = [];
  isInternational: boolean = true;
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
    private router: Router
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
  getDAte(){
    const changeDate=this.userForm.get('collectionDate')?.value
console.log("date",changeDate);

  }
  ngOnInit(): void {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    this.minDate = `${year}-${month}-${day}`;
   
    // console.log('calender date disable', this.minDate);
    this.getUserId();
    this.getCountryInDropdown();
    this.getContentListInDropdown();
    this.getPackagingTypeDropdown();
    // this.onDomesticClick()
    // this.userForm = new FormGroup({
    //   pickupSuburb: new FormControl('BRUNSWICK'),
    //   pickupState: new FormControl('WA'),
    //   pickupPostcode: new FormControl('6224'),
    //   pickupBuildingType: new FormControl('commercial'),
    //   isPickupTailLift: new FormControl(false),
    //   destinationSuburb: new FormControl('THE UNIVERSITY OF SYDNEY'),
    //   destinationState: new FormControl('NSW'),
    //   destinationPostcode: new FormControl('2006'),
    //   destinationBuildingType: new FormControl('residential'),
    //   isDropOffTailLift: new FormControl(false),
    //   isDropOffPOBox: new FormControl(false),
    //   items: new FormArray([ this.createItem()]),
    // });

    // this.userForm = this.fb.group({
    //   pickupSuburb: [''],
    //   collection: ['collection'],
    //   pickupState: [''],
    //   pickupPostcode: [''],
    //   pickupBuildingType: ['commercial'],
    //   isPickupTailLift: [false],
    //   destinationSuburb: [''],
    //   destinationState: [''],
    //   destinationPostcode: [''],
    //   destinationBuildingType: ['residential'],
    //   isDropOffTailLift: [false],
    //   isDropOffPOBox: [false],
    //   items: this.fb.array([]),
    // });
    this.userForm = this.fb.group({
      fromSuburb: ['',Validators.required],
      fromCode: ['',Validators.required],
      fromState: ['',Validators.required],
      toSuburb: ['',Validators.required],
      toCode: ['',Validators.required],
      toState: ['',Validators.required],
      countryCode: ['AU',Validators.required],
      itemType: ['other',Validators.required],
      weightType: ['kg',Validators.required],
      weights: ['',Validators.required],
      lengths: ['',Validators.required],
      heights: ['',Validators.required],
      widths: ['',Validators.required],
      dimensionUnits: ['in',Validators.required],
      packageType: ['other',Validators.required],
      contents: ['other',Validators.required],
      collectionDate: ['',Validators.required],
      quantitys: [1],
      items: new FormArray([this.createItem()]),
      createdby: [this.userId],
    });
    // console.log(this.userForm.get('items') as FormArray);
    // this.addItem();
    this.patchInitialFormValues();
  }
  createItem(): FormGroup {
    // return this.fb.group({
    //   type: ['box'],
    //   weight: ['2', [
    //     Validators.required,
    //     Validators.min(0.01),
    //     Validators.max(25),
    //     Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$') // Allows decimal values with up to 2 decimal places
    //   ]],
    //   length: ['2',[
    //     Validators.required,
    //     Validators.min(1),
    //     Validators.max(200),
    //     Validators.pattern('^[0-9]+$')  // Only integer values
    //   ]],
    //   width: ['', [
    //     Validators.required,
    //     Validators.min(1),
    //     Validators.max(200),
    //     Validators.pattern('^[0-9]+$') // Only integer values
    //   ]],
    //   // height: ['', [
    //   //   Validators.required,
    //   //   Validators.min(1),
    //   //   Validators.max(200),
    //   //   Validators.pattern('^[0-9]+$') // Only integer values
    //   // ]],
    //   quantity: ['1'],
    //   contents: ['alcohol'],
    // });

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

  addItem(): void {
    this.items.push(this.createItem());
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
    // console.log('From  =--> ', this.suburbNameOne);
    // console.log('to  =--> ', this.suburbNameTwo);
    const formValue = this.userForm.value;
    // console.log('value form control', formValue);
    // console.log('One', this.searchTextOne);
    // console.log('Two', this.searchTextTwo);

    return formValue;
  }

  // createItem(): FormGroup {
  //   return new FormGroup({
  //     type: new FormControl('bag'),
  //     weight: new FormControl('2'),
  //     length: new FormControl('2'),
  //     width: new FormControl('2'),
  //     height: new FormControl('2'),
  //     quantity: new FormControl('1'),
  //     contents: new FormControl('alcohol'),
  //   });
  // }

  getContentListInDropdown() {
    this.indexService.getContentList().subscribe(
      (response: any) => {
        // console.log('========------> ', response);
        this.ContentList = response.data; // Adjusted to match the actual response structure
        // this.cdr.detectChanges();
      },
      (error) => {
        this.GetRes = false;
      }
    );
  }
  getUserId() {
    const getUser: any = localStorage.getItem('user');
    //  console.log("get user in index", getUser);
    const decryptUser = this.authService.decrypt(getUser);
    //  console.log("decrypt user in index",decryptUser);
    const userData = JSON.parse(decryptUser);
    //  console.log("parsed data in add user",userData);
    this.userId = userData.user.id;
    console.log('user id in index', this.userId);
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
const changeDate=this.userForm.get('collectionDate')?.value
console.log("date",changeDate);

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

  // getDimensions() {

  //   // Assuming you're looping through items or just getting the first one:
  //   itemsArray.controls.forEach((itemGroup: AbstractControl) => {
  //     const length = itemGroup.get('length')?.value;
  //     const width = itemGroup.get('width')?.value;
  //     const height = itemGroup.get('height')?.value;

  //     console.log(`Dimensions - Length: ${length}, Width: ${width}, Height: ${height}`);
  //   });
  // }

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

  // onDomesticClick() {
  //   this.isInternational = false; // Set isInternational to false when domestic option is clicked
  //   if(this.isInternational==false){
  //     this.selectedCountryCode='AU'
  //   }
  // }

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
          this.isShowDropdownOne = true;
          this.isLoadingOne = false; // Stop loading for first input
        } else if (dropdown === 'two') {
          this.filteredSuburbsTwo = response.data;
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
    console.log("Physical weight fetched:", this.userInput);
    
    const itemsArray = this.userForm.get('items') as FormArray;
    console.log("Items array:", itemsArray);
    
    for (let i = 0; i < itemsArray.length; i++) {
      const itemGroup = itemsArray.at(i) as FormGroup; // Correctly cast to FormGroup
      console.log("Item group:", itemGroup);
      
      itemGroup.patchValue({
        physicalWeight: this.userInput
      });
    }
  }
  
  submitForm() {
    this.getDimensions();

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
      localStorage.setItem('formValue', JSON.stringify(this.userForm.value));
      this.isLoading = true;
      this.indexService.postMergeQuotes(this.userForm.value).subscribe((response:any)=>{
       
       
        if(response)
          console.log("response from index",response);
          this.fastCourierQuotes=response.fastCourierResponse.data
          console.log("response from fastCourierResponse",this.fastCourierQuotes);
          
          this.router.navigate(['/application/replica']);
          this.isLoading = false;
          // this.toast.success('Form submitted successfully!')
          // this.userForm.reset();
        {const quotes=response
        console.log("quotes",response);
        if(quotes){
          localStorage.setItem("quotationId",response.userData.quptationId)
          localStorage.setItem("userId",response.userData.userId)
        }}
        
      },(error:any)=>{
        this.isLoading = false;
        // this.toast.error('Form submission failed')
        // this.userForm.reset();
      })
    }
  }
}
// {
//   "quoteId": "KAQVXAKXZQ",
//   "senderType": "sender",
//   "pickupFirstName": "John",
//   "pickupLastName": "Doe",
//   "pickupCompanyName": "John LTD",
//   "pickupEmail": "john@gmail.com",
//   "pickupAddress1": "Street-10",
//   "pickupAddress2": "Sector-25",
//   "pickupPhone": "1234567890",
//   "destinationFirstName": "Ewen",
//   "destinationLastName": "Luis",
//   "destinationCompanyName": "Ewen LTD",
//   "destinationEmail": "ewen@gmail.com",
//   "destinationAddress1": "Street-15",
//   "destinationAddress2": "Sector-30",
//   "destinationPhone": "9876543210",
//   "collectionDate": "2024-09-06",
//   "pickupTimeWindow": "9am to 5pm",
//   "parcelContent": "Lorem Ipsum",
//   "specialInstructions": "Drop the parcel carefully",
//   "valueOfContent": 100,
//   "authorityToLeave": false,
//   "noPrinter": false,
//   "extendedLiability": "1",
//   "insuranceValue": "$500",
//   "insuranceFee": "$4.00",
//   "acceptInsuranceConditions": true,
//   "acceptTermConditions": true,
//   "acceptAttachment": true,
//   "acceptNoDangerousGoods": true,
//   "acceptReadFinancialServiceGuide": true,
//   "emailForDocuments": "john@gmail.com",
//   "additionalEmailsForDocuments": [
//     {
//       "email":"john@gmail.com"
//     }
//   ]
// }
