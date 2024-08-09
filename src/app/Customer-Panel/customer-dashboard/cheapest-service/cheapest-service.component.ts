import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { IndexService } from 'src/app/core/services/index.service';
import { HotToastService } from '@ngneat/hot-toast';
import { DatePipe } from '@angular/common';
import { CustomerDashboardService } from 'src/app/core/services/customer-dashboard.service';
@Component({
  selector: 'app-cheapest-service',
  templateUrl: './cheapest-service.component.html',
  styleUrls: ['./cheapest-service.component.css'],
  providers: [DatePipe],
})
export class CheapestServiceComponent implements OnInit {
  minDate!: string;
  storedValue: any;
  parsedValue: any;
  isLoading: boolean = false;
  collectionDate: any;
  dropdownCollectionDate: any;
  formattedCollectionDate: any;
  estimatedDeliveryDate: any;
  Quotes!: any[];
  constructor(
    private indexService: IndexService,
    private toast: HotToastService,
    private datePipe: DatePipe,
    private cdr: ChangeDetectorRef,
    private customerDashboardService: CustomerDashboardService
  ) {}

  updateFormValue(): void {
    // console.log('check after calling', this.parsedValue);

    localStorage.setItem('formValue', JSON.stringify(this.parsedValue));
    // console.log('Form value updated in localStorage:', this.parsedValue);
    this.fetchQuotes(); // Fetch quotes after updating the form value
  }
  getFormValue() {
    // console.log('get form value called');

    this.storedValue = localStorage.getItem('formValue');
    this.parsedValue = JSON.parse(this.storedValue);
    this.collectionDate = this.convertCollectionDate()
    console.log('collection date in cheapest', this.collectionDate);
    this.dropdownCollectionDate = localStorage.getItem('dropdownDate');
    console.log('saved dropdowndate', this.dropdownCollectionDate);
    if (
      this.dropdownCollectionDate &&
      this.dropdownCollectionDate !== this.collectionDate
    ) {
      // console.log('inside dc');

      this.parsedValue.collection = this.dropdownCollectionDate;
      // console.log('changed value', this.parsedValue.collection);
      this.convertCollectionDate();
      this.updateFormValue();
    } else {
      this.fetchQuotes(); // Fetch quotes if dropdownCollectionDate is not set
      this.collectionDate = '';
    }
  }
  ngOnInit(): void {
    this.getFormValue();
    this.convertCollectionDate();
    this.customerDashboardService.invokeFunction$.subscribe(() => {
      this.getFormValue();
    });
    // setInterval(() => {
    //   this.getFormValue();
    //   this.cdr.detectChanges(); // Manually trigger change detection
    // }, 2000);
  }

  fetchQuotes(): void {
    if (this.parsedValue) {
      // console.log('form value inside fetch quotes', this.parsedValue);

      this.isLoading = true;
      this.indexService.postFetchQuotes(this.parsedValue).subscribe(
        (response: any) => {
          // console.log('-----My response', response);
          if (response) {
            this.isLoading = false;
            this.Quotes = response.data;
            localStorage.setItem('quotes', JSON.stringify(this.Quotes));
            // console.log('My quotes', this.Quotes);
          }
        },
        (error: any) => {
          this.isLoading = false;
          this.toast.error('IP accessing issue');
        }
      );
    }
  }

  convertCollectionDate() {
    // console.log('convert', this.parsedValue.collection);

    this.collectionDate = this.parsedValue.collection;
    // console.log('date in convert initial', this.collectionDate);

    const dayOfWeek = this.datePipe.transform(this.collectionDate, 'EEE'); // short weekday
    const day = this.datePipe.transform(this.collectionDate, 'dd'); // 2-digit day
    const month = this.datePipe.transform(this.collectionDate, 'MMMM'); // full month name

    this.formattedCollectionDate = `${dayOfWeek}, ${day} ${month}`;
    // console.log('format', this.formattedCollectionDate);
    return this.formattedCollectionDate
  }

  addBusinessDays(numberOfDays: any): Date {
    const days = numberOfDays.split(' ');
    const expectedays = days[0];
    // console.log('days seperated', days);

    this.collectionDate = this.parsedValue.collection;
    const currentDate = new Date(this.collectionDate);
    let daysAdded = 0;

    while (daysAdded < expectedays) {
      currentDate.setDate(currentDate.getDate() + 1);

      // Check if the current day is a weekend
      if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
        // 0 = Sunday, 6 = Saturday
        daysAdded++;
      }
    }
    this.estimatedDeliveryDate = this.formatDate(currentDate);
    return this.estimatedDeliveryDate;
  }

  formatDate(date: Date): string {
    this.collectionDate = this.parsedValue.collection;
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      day: '2-digit',
      month: 'long',
    };
    return date.toLocaleDateString('en-US', options);
  }

  // let startDate: string = "2024-07-19";
  // let businessDaysToAdd: number = 6;
  // let estimatedDeliveryDate: Date = addBusinessDays(startDate, businessDaysToAdd);

  // console.log(formatDate(estimatedDeliveryDate)); // Output: Mon, 29 July
}
