import { Component, OnInit } from '@angular/core';
import { MergeService } from 'src/app/core/services/merge.service';
import { IndexService } from 'src/app/core/services/index.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-postmergequotes',
  templateUrl: './postmergequotes.component.html',
  styleUrls: ['./postmergequotes.component.css'],
  providers: [DatePipe],
})
export class PostmergequotesComponent implements OnInit {
  mergeResponse: any;
  // Provide a fallback value
  quoteId: string = JSON.parse(localStorage.getItem('quoteid') || '""');
  userId: string = JSON.parse(localStorage.getItem('userid') || '""');

  storeCurrent: any;

  // qId!: string
  // uId!: string
  ishipperCalculation: any;
  toBeUsedData: any;
  collectionDate: any;
  formattedCollectionDate: any;
  estimatedDeliveryDate: any;
  expectedDays: any;
  sortedAlphabetically!: any[];
  sortedPrice!: any[];
  sortedBusinessDays!: any[];
  formattedCurrentDate: any;
  currentDate: any = new Date();
  filteredishipperCalculation: any;
  insuranceList!: any;
  offerMessage: any;
  message1: any;
  indexForm: any;
  idQuote: any;
  idOrder: any;
  constructor(
    private mergeService: MergeService,
    private datePipe: DatePipe,
    private indexService: IndexService
  ) {}
  ngOnInit(): void {
    this.indexService.mergeResponse$.subscribe((res) => {
      this.mergeResponse = res;
      console.log('merge response in post merge quotes', this.mergeResponse);

      //   this.qId = this.mergeResponse.quptationId;
      //  this. uId = this.mergeResponse.userId
      // Subscribe to BehaviorSubject
    });
    this.getCalculation();
    this.getInsuranceList();
    console.log('quote id', this.quoteId);
    console.log('user id', this.userId);
  }
  getCalculation() {
    console.log('get calculation called');

    this.mergeService
      .getIShipperCalculation(this.quoteId, this.userId)
      .subscribe((response: any) => {
        console.log('ishipeer calculation api called');

        this.ishipperCalculation = response;
        console.log('ishipper calculation response', response);
        this.filteredishipperCalculation = this.ishipperCalculation.filter(
          (data: any) => {
            return !(
              data.responseType === 'fastCourier' &&
              data.courierName === 'COURIERS PLEASE'
            );
          }
        );

        console.log('filtered data---------', this.filteredishipperCalculation);

        this.mergeService.updateIshipperCalculation(this.ishipperCalculation);
        // localStorage.setItem("calculation", JSON.stringify(this.ishipperCalculation));

        // this.displayOffers()
        console.log('response from services', this.ishipperCalculation);

        const savedForm = this.indexService.indexForm.subscribe((res) => {
          this.indexForm = res;
          console.log('index form value', res);
        });

        console.log('get saved form', this.indexForm);
        this.collectionDate = this.indexForm.collectionDate;
        this.convertCollectionDate();
        console.log('collection date', this.collectionDate);

        this.ishipperCalculation.sort((a: any, b: any) => {
          const priceA = a.ishhiperFinalPrice || 0;
          const priceB = b.ishhiperFinalPrice || 0;

          return priceA - priceB;
        });
      });
  }

  getIndex(i: number, ETA: any) {
    if (i) {
      console.log('index from merge', i);
      const collection = this.convertCollectionDate();
      this.toBeUsedData = {
        collectionDate: collection,
        index: i,
        estimatedDate: this.addBusinessDays(ETA),
       
      };
      //       localStorage.setItem("fetchcalculation", JSON.stringify(collection));
      //       localStorage.setItem("convertedCollection", JSON.stringify(i));
      //     }
      // if(ETA){
      //   console.log("store estimated date",this.addBusinessDays(ETA));

      //   localStorage.setItem("estimatedDate", JSON.stringify(this.addBusinessDays(ETA)));
      this.mergeService.updateQuoteData(this.toBeUsedData);
    }
  }

  convertCollectionDate() {
    // console.log("convert collection date called");

    const dayOfWeek = this.datePipe.transform(this.collectionDate, 'EEE'); // short weekday
    const day = this.datePipe.transform(this.collectionDate, 'dd'); // 2-digit day
    const month = this.datePipe.transform(this.collectionDate, 'MMMM'); // full month name
    const year = this.datePipe.transform(this.collectionDate, 'yyyy'); // full month name
    // console.log(day);
    // console.log(dayOfWeek);
    // console.log(month);

    this.formattedCollectionDate = `${dayOfWeek}, ${day} ${month} , ${year}`;
    // console.log('format', this.formattedCollectionDate);
    return this.formattedCollectionDate;
  }

  convertCurrentDate() {
    const dayOfWeek = this.datePipe.transform(this.currentDate, 'EEE'); // short weekday
    const day = this.datePipe.transform(this.currentDate, 'dd'); // 2-digit day
    const month = this.datePipe.transform(this.currentDate, 'MMMM'); // full month name
    this.formattedCurrentDate = `${dayOfWeek}, ${day} ${month}`;
    return this.formattedCurrentDate;
  }
  getInsuranceList() {
    this.mergeService.getinsuranceList().subscribe(
      (response: any) => {
        if (response) this.insuranceList = response;
        console.log('insurance list', this.insuranceList);
      },
      (error: any) => {
        console.log('error in fetching insurance list');
      }
    );
  }

  addBusinessDays(numberOfDays: any): Date {
    //console.log("days from html",numberOfDays);

    const days = numberOfDays.split(' ');
    // console.log("checking days output",days);

    // console.log("checking type",typeof(days));

    this.expectedDays = days[0];

    try {
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
    } catch (e) {
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

    
    this.estimatedDeliveryDate = this.formatDate(currentDate)
    
    return this.estimatedDeliveryDate;
  }

  formatDate(date: Date): string {
    
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    };

    return  date.toLocaleDateString('en-US', options)
     
  }

  

  //   onHover(type: any, price: any) {
  //     console.log(type, "response type in func");

  //     if (type === "courierplease") {
  //         if (price < 350) {
  //            this.message1 = this.insuranceList.data[0];
  //             // Use message1 here, e.g., display it or store it somewhere
  //             console.log(this.message1);
  //         }else if (price > 350 && price <= 1000){
  //           this.message1 = this.insuranceList.data[1];
  //         }else if (price > 1000 && price <= 1500)
  //         {
  //           this.message1 = this.insuranceList.data[2];
  //         }
  //     }
  // }
  onHover(type: any, price: any) {
    console.log(type, 'response type in func');

    if (type === 'fastCourier' && price < 350) {
      this.message1 = this.insuranceList.data[0];
    } else if (type === 'fastCourier' && price >= 350 && price <= 1000) {
      this.message1 = this.insuranceList.data[1];
    } else if (type === 'fastCourier' && price > 1000 && price <= 1500) {
      this.message1 = this.insuranceList.data[2];
    } else if (type === 'fastCourier' && price > 1500 && price <= 2000) {
      this.message1 = this.insuranceList.data[3];
    } else if (type === 'fastCourier' && price > 2000 && price <= 2500) {
      this.message1 = this.insuranceList.data[4];
    } else if (type === 'fastCourier' && price > 2500 && price <= 3000) {
      this.message1 = this.insuranceList.data[5];
    } else if (type === 'fastCourier' && price > 3000 && price <= 3500) {
      this.message1 = this.insuranceList.data[6];
    } else if (type === 'fastCourier' && price > 3500 && price <= 4000) {
      this.message1 = this.insuranceList.data[7];
    } else if (type === 'fastCourier' && price > 4000 && price <= 4500) {
      this.message1 = this.insuranceList.data[8];
    } else if (type === 'fastCourier' && price > 4500 && price <= 5000) {
      this.message1 = this.insuranceList.data[9];
    } else if (type === 'fastCourier' && price > 5000 && price <= 5500) {
      this.message1 = this.insuranceList.data[10];
    } else if (type === 'fastCourier' && price > 5500 && price <= 6000) {
      this.message1 = this.insuranceList.data[11];
    } else if (type === 'fastCourier' && price > 6000 && price <= 6500) {
      this.message1 = this.insuranceList.data[12];
    } else if (type === 'fastCourier' && price > 6500 && price <= 7000) {
      this.message1 = this.insuranceList.data[13];
    } else if (type === 'fastCourier' && price > 7000 && price <= 7500) {
      this.message1 = this.insuranceList.data[14];
    } else if (type === 'fastCourier' && price > 7500 && price <= 8000) {
      this.message1 = this.insuranceList.data[15];
    } else if (type === 'fastCourier' && price > 8000 && price <= 8500) {
      this.message1 = this.insuranceList.data[16];
    } else if (type === 'fastCourier' && price > 8500 && price <= 9000) {
      this.message1 = this.insuranceList.data[17];
    } else if (type === 'fastCourier' && price > 9000 && price <= 9500) {
      this.message1 = this.insuranceList.data[18];
    } else if (type === 'fastCourier' && price > 9500 && price <= 10000) {
      this.message1 = this.insuranceList.data[19];
    } else if (type === 'fastCourier' && price > 10000 && price <= 11000) {
      this.message1 = this.insuranceList.data[20];
    } else if (type === 'fastCourier' && price > 11000 && price <= 12000) {
      this.message1 = this.insuranceList.data[21];
    } else if (price > 12000 && price <= 13000) {
      this.message1 = this.insuranceList.data[22];
    } else if (type === 'fastCourier' && price > 13000 && price <= 14000) {
      this.message1 = this.insuranceList.data[23];
    } else if (type === 'fastCourier' && price > 14000 && price <= 15000) {
      this.message1 = this.insuranceList.data[24];
    } else if (type === 'fastCourier' && price > 15000 && price <= 20000) {
      this.message1 = this.insuranceList.data[25];
    } else if (type === 'fastCourier' && price > 20000 && price <= 22500) {
      this.message1 = this.insuranceList.data[26];
    } else if (type === 'fastCourier' && price > 22500 && price <= 25000) {
      this.message1 = this.insuranceList.data[27];
    } else if (type === 'fastCourier' && price > 25000 && price <= 27500) {
      this.message1 = this.insuranceList.data[28];
    } else if (type === 'fastCourier' && price > 27500 && price <= 30000) {
      this.message1 = this.insuranceList.data[29];
    } else {
      // Handle cases where the price exceeds 30000
      console.log('not matching response');
    }

    console.log(this.message1);
  }
}
