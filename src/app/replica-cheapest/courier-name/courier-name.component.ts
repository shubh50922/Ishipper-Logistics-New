import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MergeService } from 'src/app/core/services/merge.service';
@Component({
  selector: 'app-courier-name',
  templateUrl: './courier-name.component.html',
  styleUrls: ['./courier-name.component.css'],
  providers: [DatePipe]
})
export class CourierNameComponent implements OnInit {

  qId: string = localStorage.getItem('quotationId') || '';
  uId: string = localStorage.getItem('userId') || '';
  ishipperCalculation: any;
  collectionDate: any;
  formattedCollectionDate: any;
  estimatedDeliveryDate: any;
  expectedDays:any
  sortedAlphabetically!:any[]
  sortedPrice!:any[]
  sortedBusinessDays!:any[]
  formattedCurrentDate: any;
  currentDate:any=new Date()
  constructor(private mergeService: MergeService,private datePipe: DatePipe) { }
  getCalculation() {
    this.mergeService
      .getIShipperCalculation(this.qId, this.uId)
      .subscribe((response: any) => {
        this.ishipperCalculation = response;
       
        this.collectionDate=this.ishipperCalculation[0].date
        
        if(this.collectionDate){
          this.convertCollectionDate()
        }
        console.log("collection date",this.collectionDate);
        console.log('merge response', this.ishipperCalculation);
        this.ishipperCalculation.sort((a: any, b: any) => {
          // console.log("Comparing:", a.courierName, b.courierName);
  
          if (!a.courierName || !b.courierName) {
              if (!a.courierName && b.courierName) return 1;
              if (!b.courierName && a.courierName) return -1;
              return 0;
          }
  
          return a.courierName.localeCompare(b.courierName);
      });
      
    });
  }
  convertCollectionDate(){
    // console.log("convert collection date called");
    
    const dayOfWeek = this.datePipe.transform(this.collectionDate, 'EEE'); // short weekday
    const day = this.datePipe.transform(this.collectionDate, 'dd'); // 2-digit day
    const month = this.datePipe.transform(this.collectionDate, 'MMMM'); // full month name
// console.log(day);
// console.log(dayOfWeek);
// console.log(month);



    this.formattedCollectionDate = `${dayOfWeek}, ${day} ${month}`;
    // console.log('format', this.formattedCollectionDate);
    return this.formattedCollectionDate

  }
 
convertCurrentDate(){
  const dayOfWeek = this.datePipe.transform(this.currentDate, 'EEE'); // short weekday
  const day = this.datePipe.transform(this.currentDate, 'dd'); // 2-digit day
  const month = this.datePipe.transform(this.currentDate, 'MMMM'); // full month name
  this.formattedCurrentDate = `${dayOfWeek}, ${day} ${month}`;
  return this.formattedCurrentDate
}


  addBusinessDays(numberOfDays: any): Date {
    //console.log("days from html",numberOfDays);
    
    const days = numberOfDays.split(' ');
    // console.log("checking days output",days);
    
// console.log("checking type",typeof(days));


    this.expectedDays=days[0]
   
     try{
    let parsedValue = JSON.parse(this.expectedDays);
    
    if (Array.isArray(parsedValue)) {
      // console.log("array -> ",parsedValue)
      // console.log(Array.isArray(parsedValue));
      
      this.expectedDays = parsedValue.sort((a, b) => b - a)[0];
    } else if (typeof parsedValue === 'number') {
      this.expectedDays = parsedValue;
      // console.log('number -> ',parsedValue);
    } else {
      throw new Error('Unsupported type');
    }
     }catch(e){
      this.expectedDays = this.expectedDays;
      // console.log("string -> ",this.expectedDays)
     }
    const currentDate = new Date(this.collectionDate);
    let daysAdded = 0;

    while (daysAdded < this.expectedDays) {
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
    
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      day: '2-digit',
      month: 'long',
    };
    return date.toLocaleDateString('en-US', options);
  }
  ngOnInit(): void {
    this.getCalculation();
  
  }
}
