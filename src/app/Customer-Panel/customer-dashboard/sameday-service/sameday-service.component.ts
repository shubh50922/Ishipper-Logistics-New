import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-sameday-service',
  templateUrl: './sameday-service.component.html',
  styleUrls: ['./sameday-service.component.css'],
  providers: [DatePipe],
})
export class SamedayServiceComponent implements OnInit {

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
    // console.log('collection date in cheapest', this.collectionDate);

    // console.log('my form in cheapest', this.parsedValue);
    if (this.parsedValue) {
      
            const storedQuotes = localStorage.getItem('quotes');
  const quotes = storedQuotes ? JSON.parse(storedQuotes) : [];
            this.Quotes = quotes
            // console.log('my quotes', this.Quotes);
            // Filter quotes where collection date matches estimated delivery date
            this.Quotes = this.Quotes.filter((quote) => {
              const estimatedDate = this.addBusinessDays(quote.eta);
              // console.log("estimated date ",estimatedDate);
              
              // console.log("converted date",this.convertCollectionDate());
              
              
              return estimatedDate ===this.convertCollectionDate();
            });
            // console.log('my quotes', this.Quotes);
          }
        }
        

  constructor(
    
    private datePipe: DatePipe
  ) {}
  ngOnInit(): void {
    this.getFormValue();
    this.convertCollectionDate();
  }
  convertCollectionDate() {
    

    const dayOfWeek = this.datePipe.transform(this.collectionDate, 'EEE'); // short weekday
    const day = this.datePipe.transform(this.collectionDate, 'dd'); // 2-digit day
    const month = this.datePipe.transform(this.collectionDate, 'MMMM'); // full month name

    this.formattedCollectionDate = `${dayOfWeek}, ${day} ${month}`;
    return this.formattedCollectionDate
  }

  addBusinessDays(numberOfDays: any): Date {
    const days = numberOfDays.split(' ');
    const expectedays = days[0];

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
    // console.log('115', currentDate);

    this.estimatedDeliveryDate = this.formatDate(currentDate);
    return this.estimatedDeliveryDate;
  }


  formatDate(date: Date): string {
    const dayOfWeek = this.datePipe.transform(date, 'EEE'); // short weekday
    const day = this.datePipe.transform(date, 'dd'); // 2-digit day
    const month = this.datePipe.transform(date, 'MMMM'); // full month name

    return `${dayOfWeek}, ${day} ${month}`;
  }
  // let startDate: string = "2024-07-19";
  // let businessDaysToAdd: number = 6;
  // let estimatedDeliveryDate: Date = addBusinessDays(startDate, businessDaysToAdd);

  // console.log(formatDate(estimatedDeliveryDate)); // Output: Mon, 29 July
}
