import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { IndexService } from 'src/app/core/services/index.service';
import { HotToastService } from '@ngneat/hot-toast';
import { CustomerDashboardService } from 'src/app/core/services/customer-dashboard.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent implements OnInit {
  activeTab!: string;
  minDate!: string;
  collectionDate:any
  storedValue: any;
  parsedValue: any;
  collection:any
  isLoading: boolean = false;
  PostData:any
  constructor(private route: ActivatedRoute, private router: Router,  private indexService: IndexService,
    private toast: HotToastService,private  customerDashboardService: CustomerDashboardService) { }

  ngOnInit(): void {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    this.minDate = `${year}-${month}-${day}`;

    // console.log('calender date disable', this.minDate);
    // Subscribe to router events to get the active tab
    this.router.events.subscribe(() => {
      this.activeTab = this.route.snapshot.firstChild?.routeConfig?.path || '';
    });

   
  }
  onClick() {
    this.customerDashboardService.triggerFunction();
  }
  getCollectionDate(date: string): void {
    this.collectionDate = date;
    // console.log("Collection date selected:", this.collectionDate);
    localStorage.setItem('dropdownDate',this.collectionDate)
    // this.storedValue = localStorage.getItem('formValue');
    // this.parsedValue = JSON.parse(this.storedValue);
    // this.collection= this.parsedValue.collection;
    // console.log('collection date in cheapest', this.collectionDate);
  
    // if (this.collection !== this.collectionDate) {
    //   this.parsedValue.collection = this.collectionDate;
    //   this.updateFormValue(); // Update the form value in localStorage
    //   this.postUpdatedForm(); // Make API call with updated data
    }

  // }
  // updateFormValue(): void {
  //   localStorage.setItem('formValue', JSON.stringify(this.parsedValue));
  //   console.log('Form value updated in localStorage:', this.parsedValue);
  //   if (this.parsedValue) {
  //     this.isLoading = true;
  //     this.indexService.postFetchQuotes(this.parsedValue).subscribe(
  //       (response: any) => {
  //         console.log('-----my response', response);
  //         if (response) {
  //           this.isLoading = false;
  //           this.PostData = response.data;
  //           localStorage.setItem('quotes', JSON.stringify(this.PostData));

  //           console.log('my quotes', this.PostData);
  //         }
  //       },
  //       (error: any) => {
  //         this.isLoading = false;

         

  //         this.toast.error('IP acessing issue');
  //       }
  //     );
  //   }

  // }
  
}
