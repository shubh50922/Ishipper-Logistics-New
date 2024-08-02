import { Component, OnInit } from '@angular/core';
import { IndexService } from 'src/app/core/services/index.service';
import { HotToastService } from '@ngneat/hot-toast';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-cheapest-service',
  templateUrl: './cheapest-service.component.html',
  styleUrls: ['./cheapest-service.component.css'],
  providers: [DatePipe],
})
export class CheapestServiceComponent implements OnInit {
  storedValue: any;
  parsedValue: any;
  isLoading: boolean = false;
  collectionDate: any;
  formattedCollectionDate: any;
  estimatedDeliveryDate: any;
  Quotes!: any[];
  getFormValue() {
    this.storedValue = localStorage.getItem('formValue');
    this.parsedValue = JSON.parse(this.storedValue);
    this.collectionDate = this.parsedValue.collection;
    console.log('collection date in cheapest', this.collectionDate);

    console.log('my form in cheapest', this.parsedValue);
    if (this.parsedValue) {
      this.isLoading = true;
      this.indexService.postFetchQuotes(this.parsedValue).subscribe(
        (response: any) => {
          console.log('-----my response', response);
          if (response) {
            this.isLoading = false;
            this.Quotes = response.data;
            localStorage.setItem('quotes', JSON.stringify(this.Quotes));

            console.log('my quotes', this.Quotes);
          }
        },
        (error: any) => {
          this.isLoading = false;

          // this.Quotes = [
          //   {
          //     "quoteId": "GPQKMDLAWQ",
          //     "courierName": "TNT",
          //     "eta": "6 Business Days",
          //     "insuranceCategory": 76,
          //     "logo": "https://enterprise-api-stage.fastcourier.com.au/images/logos/tnt.png",
          //     "name": "Road Express",
          //     "pickupCutOffTime": "14:30",
          //     "priceExcludingGst": 64.92,
          //     "priceIncludingGst": 71.41,
          //     "subLabel": null,
          //     "insurance_link": "https://fastcourier.com.au/extended-liability-terms-conditions",
          //     "rating": 5
          //   },
          //   {
          //     "quoteId": "WJOWNYRWLQ",
          //     "courierName": "TNT",
          //     "eta": "2 Business Days",
          //     "insuranceCategory": 75,
          //     "logo": "https://enterprise-api-stage.fastcourier.com.au/images/logos/tnt.png",
          //     "name": "Overnight Express",
          //     "pickupCutOffTime": "14:30",
          //     "priceExcludingGst": 66.45,
          //     "priceIncludingGst": 73.1,
          //     "subLabel": null,
          //     "insurance_link": "https://fastcourier.com.au/extended-liability-terms-conditions",
          //     "rating": 5
          //   }
          // ]

          this.toast.error('IP acessing issue');
        }
      );
    }
  }
  constructor(
    private indexService: IndexService,
    private toast: HotToastService,
    private datePipe: DatePipe
  ) {}
  ngOnInit(): void {
    this.getFormValue();
    this.convertCollectionDate();
  }
  convertCollectionDate() {
    this.collectionDate = this.parsedValue.collection;
    console.log('date in convert initial', this.collectionDate);

    const dayOfWeek = this.datePipe.transform(this.collectionDate, 'EEE'); // short weekday
    const day = this.datePipe.transform(this.collectionDate, 'dd'); // 2-digit day
    const month = this.datePipe.transform(this.collectionDate, 'MMMM'); // full month name

    this.formattedCollectionDate = `${dayOfWeek}, ${day} ${month}`;
  }

  addBusinessDays(numberOfDays: any): Date {
    const days = numberOfDays.split(' ');
    const expectedays = days[0];
    console.log('days seperated', days);

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
