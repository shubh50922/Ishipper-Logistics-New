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
  editId: any;
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
  responseFromPost: any;
  savedCommissions: any;
  edittedData: any;
  getId!: number;
  filteredDatafordelete:any
  closeModal:boolean=false
  dataToEdit:any
  constructor(
    private supplierservice: SupplierService,
    private formBuilder: FormBuilder,
    private commissionservice: CommissionService,
    private toast: HotToastService
  ) {
    this.commissionForm = this.formBuilder.group({
      id: [0],
      carrierId: [''],
      isPercentage: [true],
      amount: [2.5, Validators.required],
      dateOfApplicable: [new Date().toISOString()],
      status: ['True', Validators.required],
      carrierName: ['', Validators.required],
      serviceName: [''],
    });
  }
  getSavedCommissions() {
    this.commissionservice.getCommisions().subscribe((response: any) => {
      this.savedCommissions = response;
      console.log('all commissions', this.savedCommissions);
    });
  }
  ngOnInit(): void {
    this.editCommissionForm = this.formBuilder.group({
      carrierName: [''],
      serviceName: [''],
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
    this.getSavedCommissions();
    
  }

  loadData(): void {
    this.supplierservice.getData().subscribe((data: any[]) => {
      this.apiData = data;
      console.log('all data', this.apiData);

      // this.serviceProviderTypes = [
      //   ...new Set(data.map((item) => item.serviceProviderType)),
      // ];
      this.serviceNames = data.map((item) => item.serviceName);
      console.log('service provider types', this.serviceProviderTypes);

      // Set the default values for the form controls

      console.log('apidata', this.apiData);
      console.log('service provider types', this.serviceProviderTypes);
      console.log('service names', this.serviceNames);
    });
  }

  filterCarrierId() {
    const selectedService = this.commissionForm.get('carrierName')?.value;
    console.log('inside filter carrier id', selectedService);

    const cutData = this.apiData.find(
      (item) => item.serviceName === selectedService
    );
    console.log('filtered selected service', cutData);

    if (cutData) {
      this.carrierId = cutData.id.toString();
      console.log('carrier id inside if cut data', this.carrierId);

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

      this.commissionservice
        .postCommission(formDataToSend)
        .subscribe((response) => {
          this.getSavedCommissions();
          this.responseFromPost = response;
this.toast.success("Post Commission Successful")
          console.log('response on posting', this.responseFromPost);
        },(error:any)=>{
          this.toast.error("Post commission failed!")
        });
    } else {
      this.toast.error('Invalid commission form');
    }
  }

  

  handleError(message: string) {
    console.error(message);
    this.toast.error('Edit Commission Failed');
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
  getIdForDelete(id: number) {
    this.getId = id;
    console.log('id for delete', this.getId);
   

  
  }
  getIdforEdit(id:any){
this.editId=id
console.log("id fetched to be edited",this.editId);
if(this.editId){
  this. dataToEdit = this.savedCommissions.find(
    (item: any) => item.commissionId == this.editId
  );
  console.log('fetch data based id', this.dataToEdit);

  if (this.dataToEdit) {
    console.log('inside if datatoedit');

    this.editCommissionForm.patchValue({
      carrierName: this.dataToEdit.carrierName,
      serviceName: '',
      isPercentage: this.dataToEdit.isPercentage,
      amount: this.dataToEdit.amount,
      status: this.dataToEdit.status,
    });
    console.log('edit form', this.editCommissionForm.value);
   

  }
}}
confirmEdit(){
  if (this.editCommissionForm.valid) {
    const formDataToSend :any = {
      isPercentage: this.editCommissionForm.get('isPercentage')?.value,
      amount: this.editCommissionForm.get('amount')?.value,
      status: this.editCommissionForm.get('status')?.value,
    };

    console.log("formData TO send", formDataToSend);
    console.log(this.editId,"edit id in confirm edit");
    
    this.commissionservice
          .updateCommission(formDataToSend, this.editId)
          .subscribe((response) => {
            this.getSavedCommissions();
            const responseFromEdit = response;
  this.toast.success("Edit Commission Successful")
          
          },(error:any)=>{
            this.toast.error("Edit Commission failed!")
          });
      } else {
        this.toast.error('Invalid commission form');
      }
    }


  confirmDelete(){
    this.commissionservice.deleteCommission(this.getId).subscribe((response:any)=>{
      this.toast.success("commission deleted successfully")
      
      // const deletedItem = this.savedCommissions.find((item: any) => item.commissionId === this.getId);
      // if (deletedItem) {
      //   deletedItem.status = false; // Update the status to false
      // }
      this.getSavedCommissions();

      // Close the modal
     
    },
    (error:any)=>{
      this.toast.error("Delete Commission failed!")

      // Close the modal
     
    })
   
    
  }
}
