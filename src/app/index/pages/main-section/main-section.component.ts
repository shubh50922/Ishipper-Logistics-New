import { Component, OnInit } from '@angular/core';
import { IndexService } from 'src/app/core/services/index.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-main-section',
  templateUrl: './main-section.component.html',
  styleUrls: ['./main-section.component.css'],
})
export class MainSectionComponent implements OnInit {
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
  suburbNameOne!: string;
  suburbStateOne!: string;
  suburbPostCodeOne!: string;
  suburbNameTwo!: string;
  suburbStateTwo!: string;
  suburbPostCodeTwo!: string;
  searchArray1!: any[];
  searchArray2!: any[];
  GetRes: boolean = true;
  packagingType! :any[]
today!:string
weightType!:any[]
  private searchSubject = new Subject<string>();

  constructor(
    private fb: FormBuilder,
    private indexService: IndexService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getCountryInDropdown();
    this.getContentListInDropdown();
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
    const currentDate=new Date
    const year=currentDate.getFullYear();
    const month=(currentDate.getMonth()+1).toString().padStart(2,'0')
    const day=currentDate.getDate()
this.today=`${year}-${month}-${day}`
    this.userForm = this.fb.group({
      pickupSuburb: [''],
      collection:['collection'],
      pickupState: [''],
      pickupPostcode: [''],
      pickupBuildingType: ['commercial'],
      isPickupTailLift: [false],
      destinationSuburb: [''],
      destinationState: [''],
      destinationPostcode: [''],
      destinationBuildingType: ['residential'],
      isDropOffTailLift: [false],
      isDropOffPOBox: [false],
      items: this.fb.array([]),
    });
    console.log(this.userForm.get('items') as FormArray);
    // this.addItem();
    this.patchInitialFormValues();
  }
  createItem(): FormGroup {
    return this.fb.group({
      type: ['bag'],
      weight: ['2'],
      length: ['2'],
      width: ['2'],
      height: ['2'],
      quantity: ['1'],
      contents: ['alcohol'],
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
      pickupSuburb: this.suburbNameOne,
      pickupState: this.suburbStateOne,
      pickupPostcode: this.suburbPostCodeOne,
    });
    this.userForm.patchValue({
      destinationSuburb: this.suburbNameTwo,
      destinationState: this.suburbStateTwo,
      destinationPostcode: this.suburbPostCodeTwo,
    });
    this.addItem(); // Ensure at least one item is added initially
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
        console.log('========------> ', response);
        this.ContentList = response.data; // Adjusted to match the actual response structure
        // this.cdr.detectChanges();
      },
      (error) => {
        this.GetRes = false;
      }
    );
  }

  getCountryInDropdown() {
    this.indexService.getCountries().subscribe((data: any[]) => {
      this.Countries = data;
      // console.log('data from api', this.Countries);
    });
  }
getPackagingTypeInDropdown(){
  this.indexService.getPackagingType().subscribe((response:any)=>{
this.packagingType=response
  })

}
  toggleDropdown(isInternational: boolean): void {
    this.isInternational = isInternational;
  }

  onDomesticClick() {
    this.isInternational = false; // Set isInternational to false when domestic option is clicked
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
      this.isShowDropdownOne = false;

      this.userForm.patchValue({
        pickupSuburb: this.suburbNameOne,
        pickupState: this.suburbStateOne,
        pickupPostcode: this.suburbPostCodeOne,
      });

      // console.log('From ', this.suburbNameOne);
    } else if (dropdown === 'two') {
      this.suburbNameTwo = suburb.name;
      this.suburbPostCodeTwo = suburb.postcode;
      this.suburbStateTwo = suburb.state;
      this.searchTextTwo = combinedSuburbValue;
      this.isShowDropdownTwo = false;

      this.userForm.patchValue({
        destinationSuburb: this.suburbNameTwo,
        destinationState: this.suburbStateTwo,
        destinationPostcode: this.suburbPostCodeTwo,
      });

      // console.log('To ', this.suburbNameTwo);
    }
  }

  submitForm() {
    const payload = {
      items: this.userForm.value.items,
    };
    if(!this.GetRes){
      // const staticValues:any = {
      //   pickupSuburb: 'BRUNSWICK',
      //   pickupState: 'WA',
      //   pickupPostcode: '6224',
      //   pickupBuildingType: 'commercial',
      //   isPickupTailLift: false,
      //   destinationSuburb: 'THE UNIVERSITY OF SYDNEY',
      //   destinationState: 'NSW',
      //   destinationPostcode: '2006',
      //   destinationBuildingType: 'residential',
      //   isDropOffTailLift: false,
      //   isDropOffPOBox: false,
      //   items: [
      //     {
      //       type: 'bag',
      //       weight: '2',
      //       length: '2',
      //       width: '2',
      //       height: '2',
      //       quantity: '1',
      //       contents: 'alcohol',
      //     },
      //   ],
      // };
      // localStorage.setItem("formValue",JSON.stringify(staticValues))
    }else if(this.GetRes){
      localStorage.setItem("formValue",JSON.stringify(this.userForm.value))
    }
  }
}
