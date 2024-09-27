import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MergeService } from 'src/app/core/services/merge.service';
import { IndexService } from 'src/app/core/services/index.service';
@Component({
  selector: 'app-fastest',
  templateUrl: './fastest.component.html',
  styleUrls: ['./fastest.component.css'],
  providers: [DatePipe]
})
export class FastestComponent implements OnInit {
  quoteId: string = JSON.parse(localStorage.getItem('quoteid') || '""');
  userId: string = JSON.parse(localStorage.getItem('userid') || '""');
  filteredishipperCalculation:any
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
  indexForm:any
  constructor(private mergeService: MergeService,private datePipe: DatePipe,private indexService:IndexService) { }
  getCalculation() {
    this.mergeService
      .getIShipperCalculation(this.quoteId, this.userId)
      .subscribe((response: any) => {
        this.ishipperCalculation = response;
        this.filteredishipperCalculation = this.ishipperCalculation.filter((data: any) => {
          return !(data.responseType === 'fastCourier' && data.courierName === 'COURIERS PLEASE');
      });
      
        console.log("filtered data---------", this.filteredishipperCalculation);
        
        
        this.mergeService.updateIshipperCalculation(this.ishipperCalculation)
        const savedForm= this.indexService.indexForm.subscribe(res=>{
          this.indexForm=res
          console.log("index form value",res);
          
               })
        
               console.log("get saved form",this.indexForm);
               this.collectionDate=this.indexForm.collectionDate
        
        if(this.collectionDate){
          this.convertCollectionDate()
        }
        console.log("collection date",this.collectionDate);
        console.log('merge response', this.ishipperCalculation);
        this.ishipperCalculation.sort((a: any, b: any) => {
          const etaA = Array.isArray(a.eta) ? Math.max(...a.eta) : parseInt(a.eta, 10);
          const etaB = Array.isArray(b.eta) ? Math.max(...b.eta) : parseInt(b.eta, 10);
          return etaA - etaB;
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
