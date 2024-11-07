import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { DeliveryDetailService } from 'src/app/core/services/delivery-detail.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { IndexService } from 'src/app/core/services/index.service';
import { MergeService } from 'src/app/core/services/merge.service';

@Component({
  selector: 'app-additional-details',
  templateUrl: './additional-details.component.html',
  styleUrls: ['./additional-details.component.css'],
})
export class AdditionalDetailsComponent implements OnInit {
  estimatedDate: any;

  getQuoteById: any;
  indexForm: any;
  savedCalculation: any;
  Calculateprice: any;
  orderform: any;
  checkForm!: FormGroup;
  checkBox1: boolean = false;
  checkBox2: boolean = false;
  checkBox3: boolean = false;
  checkBox4: boolean = false;
  checkBox5: boolean = false;
  isChecked: boolean = false;
  isPickupRequired: boolean = false;
  pickupStatus: any;
  constructor(
    private fb: FormBuilder,
    private deliveryDetailService: DeliveryDetailService,
    private sharedService: SharedService,
    private indexService: IndexService,
    private mergeService: MergeService
  ) {}

  ngOnInit(): void {
    // Initialize form with FormControls for individual checkboxes
    this.checkForm = this.fb.group({
      acceptAttachment: [false, Validators.required],
      acceptTermConditions: [false, Validators.required],
      acceptInsuranceConditions: [false, Validators.required],
      acceptNoDangerousGoods: [false, Validators.required],
      acceptReadFinancialServiceGuide: [
        { value: false, disabled: true },
        Validators.required,
      ],
      emailForDocuments: [
        'john@gmail.com',
        [Validators.required, Validators.email],
      ],
      isPickupRequired: [],
      additionalEmailsForDocuments: this.fb.array([
        this.createAdditionalEmail(),
      ]),
    });
    this.fetchIshipperCalculation();
    const itemsArray = this.indexForm.items;
    const count = itemsArray.length;
    console.log('consignment count', count);
    this.calculateTotalWeight();
    this.calculateTotalquantity();
  }
  createAdditionalEmail(): FormGroup {
    return this.fb.group({
      email: ['support@ishipper.com.au', [Validators.email]],
    });
  }

  get additionalEmailsForDocuments(): FormArray {
    return this.checkForm.get('additionalEmailsForDocuments') as FormArray;
  }

  addAdditionalEmail() {
    this.additionalEmailsForDocuments.push(this.createAdditionalEmail());
  }

  removeAdditionalEmail(index: number) {
    this.additionalEmailsForDocuments.removeAt(index);
  }
  calculateTotalWeight() {
    const itemsArray = this.indexForm.items;

    // Use reduce to accumulate the total weight
    const totalWeight = itemsArray.reduce((acc: number, item: any) => {
      // Parse the weight as a float to ensure both integers and floats are handled
      return acc + parseFloat(item.weight);
    }, 0); // Initial value of the accumulator (total weight) is 0

    console.log('Total Weight:', totalWeight);
    return totalWeight;
  }
  calculateTotalquantity() {
    const itemsArray = this.indexForm.items;

    // Use reduce to accumulate the total quantity
    const totalquantity = itemsArray.reduce((acc: number, item: any) => {
      // Parse the quantity as a float to ensure both integers and floats are handled
      return acc + parseFloat(item.quantity);
    }, 0); // Initial value of the accumulator (total quantity) is 0

    console.log('Total quantity:', totalquantity);
    return totalquantity;
  }
  onPickupChange(event: any): void {
    this.isPickupRequired = event.target.checked;
    this.pickupStatus = this.isPickupRequired ? 'Yes' : 'No';
    if (this.pickupStatus) {
      this.sharedService.setcheckFormValue(this.checkForm.value);
    }
    console.log('Pickup required:', this.pickupStatus);
    console.log('hbsiuwbsiw', this.checkForm.value);
  }
  checkTermsConditions(controlName: string) {
    const control = this.checkForm.get(controlName);
    if (control) {
      control.setValue(!control.value); // Toggle the checkbox state
    }
  }

  // Method to handle "Agree to all" checkbox change
  checkAllConditions(event: any,controlName: string) {
    const isChecked = event.target.checked;
    this.checkForm.patchValue({
      acceptInsuranceConditions: isChecked,
      acceptAttachment: isChecked,
      acceptNoDangerousGoods: isChecked,
      acceptTermConditions: isChecked,
      acceptReadFinancialServiceGuide: isChecked,
    });
  }

  // Method to check if all conditions are checked
  areAllChecked(): boolean {
    return (
      this.checkForm.get('acceptInsuranceConditions')?.value &&
      this.checkForm.get('acceptAttachment')?.value &&
      this.checkForm.get('acceptNoDangerousGoods')?.value &&
      this.checkForm.get('acceptTermConditions')?.value &&
      this.checkForm.get('acceptReadFinancialServiceGuide')?.value
    );
  }

  fetchIshipperCalculation() {
    this.mergeService.quoteData$.subscribe((res) => {
      this.estimatedDate = res.estimatedDate;
      this.getQuoteById = res.index;
    });
    this.indexService.indexForm$.subscribe((res) => {
      this.indexForm = res;
    });
    this.deliveryDetailService.sharedData$.subscribe((res) => {
      this.orderform = res;
    });
    //   this.estimatedDate=JSON.parse(localStorage.getItem('estimatedDate') || '');
    //  this.indexForm = JSON.parse(localStorage.getItem('formValue') || '');
    //   this.formattedCollectionDate=JSON.parse(localStorage.getItem('convertedCollection') || '');
    console.log('formatted collection date', this.getQuoteById);
    //  this.orderform=JSON.parse(localStorage.getItem('orderForm') || '');
    console.log('order form value', this.orderform);

    this.Calculateprice =
      this.getQuoteById.ishhiperFinalPrice - this.getQuoteById.ishipperGST;

    this.savedCalculation = JSON.parse(
      localStorage.getItem('fetchcalculation') || '{}'
    );

    console.log(this.savedCalculation);
    console.log('form value in delivery detail', this.indexForm);
  }

  formatDateTime(isoString: string): string {
    const date = new Date(isoString);

    // Format date as YYYY-MM-DD
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Adding leading zero if needed
    const day = ('0' + date.getDate()).slice(-2); // Adding leading zero if needed
    const formattedDate = `${year}-${month}-${day}`;

    // Extract and format time as HH:MM AM/PM
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'
    const formattedTime = `${('0' + hours).slice(-2)}:${('0' + minutes).slice(
      -2
    )} ${ampm}`;

    return `${formattedDate} ${formattedTime}`;
  }
  //   areAllChecked(): boolean {
  //   return this.checkForm.get('acceptInsuranceConditions')?.value &&
  //          this.checkForm.get('acceptAttachment')?.value &&
  //          this.checkForm.get('acceptNoDangerousGoods')?.value &&
  //          this.checkForm.get('acceptTermConditions')?.value &&
  //          this.checkForm.get('acceptReadFinancialServiceGuide')?.value;
  // }

  onSubmit() {
    console.log(' onsubmit called');
    if (this.checkForm.valid) {
      this.deliveryDetailService.updatecheckValues(this.checkForm.value);
    }
  }
}
