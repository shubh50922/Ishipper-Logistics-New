import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-fastest-service',
  templateUrl: './fastest-service.component.html',
  styleUrls: ['./fastest-service.component.css'],
  providers: [DatePipe]
})
export class FastestServiceComponent implements OnInit {
fastestQuotes!:any[]
estimatedDeliveryDate: any;
collectionDate: any;
formattedCollectionDate: any;
storedValue: any;
parsedValue: any;
  constructor(private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getQuotes()
    this.convertCollectionDate();
  }
getQuotes(){
  this.storedValue = localStorage.getItem('formValue');
  this.parsedValue = JSON.parse(this.storedValue);
  this.collectionDate = this.parsedValue.collection;
  console.log('collection date in cheapest', this.collectionDate);

  console.log('my form in cheapest', this.parsedValue);
  if (this.parsedValue){
    const storedQuotes = localStorage.getItem('quotes');
  const quotes = storedQuotes ? JSON.parse(storedQuotes) : [];
  console.log(quotes);
  this.fastestQuotes = this.sortEstimatedDays(quotes);
  console.log("sorted data ",this.fastestQuotes);
  }
  
  
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


sortEstimatedDays(quotes: any[]):any[]{
  // Sorting the quotes array based on eta in business days
return quotes.sort((a, b) => {
  console.log("a",a)
  console.log("b",b)
  
  const getBusinessDays = (eta: string) => {
      // Extract the number of business days from the eta string
      const match = eta.match(/(\d+)\s*Business Days/);
      console.log("My match ", match)
      return match ? parseInt(match[1], 10) : 0;
  };

  // // Compare the extracted business days for sorting
  return getBusinessDays(a.eta) - getBusinessDays(b.eta);
});
}
}
