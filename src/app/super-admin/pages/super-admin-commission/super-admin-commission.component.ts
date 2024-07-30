import { Component, OnInit } from '@angular/core';
import { CommissionService } from 'src/app/core/services/commission.service';
import { HotToastService } from '@ngneat/hot-toast';
import { SupplierService } from 'src/app/core/services/supplier.service';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-super-admin-commission',
  templateUrl: './super-admin-commission.component.html',
  styleUrls: ['./super-admin-commission.component.css'],
})
export class SuperAdminCommissionComponent implements OnInit {
  apiData: any[] = [];
  serviceProviderTypes: any[] = [];
  serviceNames: string[] = [];
  filteredServices: any[] = [''];
  carrierId: string = '';
  getIdFromResponse!: number;
  value: boolean = false;
  editCommissionForm!: FormGroup;
  Id: number = 0;
  commissionForm!: FormGroup;
  CommissionFormdata: any[] = [];
  formattedDate!: string;
  postCommissionForm!: any[];
  fetchId!: number;
  fetchDataBasedId!: any;

  constructor(
    private supplierservice: SupplierService,
    private formBuilder: FormBuilder,
    private commissionservice: CommissionService,
    private toast: HotToastService
  ) {
    this.commissionForm = this.formBuilder.group({
      id: [],
      carrierId: [''],
      isPercentage: [true],
      amount: [2.5, Validators.required],
      dateOfApplicable: [new Date().toISOString()],
      status: ['True', Validators.required],
      carrierName: ['', Validators.required],
      serviceName: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.editCommissionForm = this.formBuilder.group({
      carrierName: ['', Validators.required],
      serviceName: ['', Validators.required],
      isPercentage: ['', Validators.required],
      amount: ['', Validators.required],
      status: ['', Validators.required],
    });

    // Retrieve existing data from localStorage on component initialization
    const storedData = localStorage.getItem('commissions');
    if (storedData) {
      this.CommissionFormdata = JSON.parse(storedData);
    }

    // Load initial data and set default selections
    this.loadData();
  }

  loadData(): void {
    this.supplierservice.getData().subscribe((data: any[]) => {
      this.apiData = data;

      this.serviceProviderTypes = [
        ...new Set(data.map((item) => item.serviceProviderType)),
      ];
      this.serviceNames = data.map((item) => item.serviceName);

      // Set the default values for the form controls
      if (this.serviceProviderTypes.length > 0) {
        this.commissionForm.patchValue({
          carrierName: this.serviceProviderTypes[0],
        });
        this.filterServiceNames(); // Trigger filtering of services based on default carrier
      }
      if (this.filteredServices.length > 0) {
        this.commissionForm.patchValue({
          serviceName: this.filteredServices[0],
        });
      }

      console.log('apidata', this.apiData);
      console.log('service provider types', this.serviceProviderTypes);
      console.log('service names', this.serviceNames);
    });
  }

  filterCarrierId() {
    const selectedService = this.commissionForm.get('serviceName')?.value;

    const cutData = this.apiData.find(
      (item) => item.serviceName === selectedService
    );

    if (cutData) {
      this.carrierId = cutData.id.toString();
      this.commissionForm.patchValue({
        carrierId: this.carrierId,
        id: this.Id,
      });
    } else {
      console.log(
        'No matching data found for selected service:',
        selectedService
      );
    }
  }

  GetServiceNames(): void {
    const selectedService = this.commissionForm.get('serviceName')?.value;

    const cutData = this.apiData.find(
      (item) => item.serviceName === selectedService
    );

    if (cutData) {
      this.carrierId = cutData.id.toString();
      this.commissionForm.patchValue({
        carrierId: this.carrierId,
        id: this.Id,
      });
    }
  }

  filterServiceNames(): void {
    const selectedType = this.commissionForm.get('carrierName')?.value;

    if (selectedType) {
      this.filteredServices = this.apiData
        .filter((item) => item.serviceProviderType === selectedType)
        .map((item) => item.serviceName);

      // Set default service name if available
      if (this.filteredServices.length > 0) {
        this.commissionForm.patchValue({
          serviceName: this.filteredServices[0],
        });
      }

      this.filterCarrierId();
    } else {
      this.filteredServices = [];
    }
  }

  getCommisions(id: any) {
    this.commissionservice
      .getCommissionById(this.getIdFromResponse)
      .subscribe((response: any) => {
        this.CommissionFormdata.push(response);
        localStorage.setItem(
          'commissions',
          JSON.stringify(this.CommissionFormdata)
        );
      });
  }

  getSelectedData(id: number) {
    console.log("Get Select Id ", id);
    
    this.fetchId = id;
    this.fetchDataBasedId = this.CommissionFormdata.find(
      (item: any) => item[0].commissionId == this.fetchId
    );
    console.log(this.fetchDataBasedId);
    
    if (this.fetchDataBasedId) {
      this.editCommissionForm.patchValue({
        carrierName: this.fetchDataBasedId[0].carrierName,
         });

      // Fetch and set the service names based on the carrier name
      this.filterServiceNames();

      // Once the services are loaded, set the remaining form values
      setTimeout(() => {
        this.editCommissionForm.patchValue({
          serviceName: this.fetchDataBasedId[0].serviceName,
          isPercentage: this.fetchDataBasedId[0].isPercentage,
          amount: this.fetchDataBasedId[0].amount,
          status: this.fetchDataBasedId[0].status,
        });
      }, 0); // Ensure this runs after the services are loaded
    }
  }
              
  deleteCommission(id: number) {
    this.fetchDataBasedId = id;
    const filteredData = this.CommissionFormdata.find(
      (item: any) => item[0].commissionId == this.fetchDataBasedId
    );

    if (filteredData) {
      const storedId = filteredData[0].commissionId;

      if (storedId) {
        this.commissionservice
          .deleteCommission(this.fetchDataBasedId)
          .subscribe(
            (response: any) => {
              this.toast.success(response.message);
            },
            (error: any) => {
              this.toast.error('Delete Commission Failed');
            }
          );
      }
    }
  }

  onSubmit(): void {
    if (this.commissionForm.valid) {
      const formDataToSend = {
        carrierId: this.commissionForm.get('carrierId')?.value,
        isPercentage: this.commissionForm.get('isPercentage')?.value,
        amount: this.commissionForm.get('amount')?.value,
        dateOfApplicable: this.commissionForm.get('dateOfApplicable')?.value,
        status: this.commissionForm.get('status')?.value,
        id: this.commissionForm.get('id')?.value,
        carrierName: this.commissionForm.get('carrierName')?.value,
      };

      this.commissionservice.postCommission(formDataToSend).subscribe(
        (response) => {
          if (response.message) {
            this.toast.error(response.message);
          } else {
            this.getIdFromResponse = response.id;
            this.getCommisions(this.getIdFromResponse);
          }
        },
        (error: any) => {
          this.handleError(
            'Post Commission Failed: ' + (error.message || 'An error occurred')
          );
        }
      );
    } else {
      this.toast.error('Invalid commission form');
    }
  }

  handleError(message: string) {
    console.error(message);
    this.toast.error('Post Commission Failed');
  }

  toggleRadio(payment: string) {
    this.value = payment === 'percent';
    this.commissionForm.patchValue({ isPercentage: this.value });
  }

  getFormattedDate(value: any) {
    const date = new Date(value);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    this.formattedDate = `${day}-${month}-${year}`;
    return this.formattedDate;
  }
}
