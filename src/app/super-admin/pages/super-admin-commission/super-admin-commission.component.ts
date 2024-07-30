import { Component, OnInit } from '@angular/core';
import { CommissionService } from 'src/app/core/services/commission.service';
import { HotToastService} from '@ngneat/hot-toast';
import { SupplierService } from 'src/app/core/services/supplier.service';
import { FormControl,FormGroup,FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-super-admin-commission',
  templateUrl: './super-admin-commission.component.html',
  styleUrls: ['./super-admin-commission.component.css']
})
export class SuperAdminCommissionComponent implements OnInit {
  apiData: any[] = [];
  serviceProviderTypes: any[] = [];
  serviceNames: string[] = [];
  filteredServices: any[] = [];
  carrierId: string = '';
  getIdFromResponse!: number;
  value: boolean = false;
  editCommissionForm!: FormGroup;
  Id: number = 0;
  commissionForm!: FormGroup;
  CommissionFormdata: any[] = [];
  formattedDate!: string;
  postCommissionForm!:any[]
  fetchId!:number
  fetchDataBasedId!:any
  constructor(
    private supplierservice: SupplierService,
    private formBuilder: FormBuilder,
    private commissionservice: CommissionService,
    private toast: HotToastService
  ) {
      this.commissionForm = this.formBuilder.group({
        id: [],
        carrierId: ['2'],
        isPercentage: [true],
        amount: [2.5],
        dateOfApplicable: [new Date().toISOString()],
        status: ['True'],
        carrierName: [],
        serviceName: [],
      });
     }

  ngOnInit(): void {
    this.editCommissionForm = this.formBuilder.group({
      carrierName: [''],
      serviceName: [''],
      isPercentage:[''],
      amount:[''],
      status: ['']
    });
   // Retrieve existing data from localStorage on component initialization
   const storedData = localStorage.getItem('commissions');
   if (storedData) {
     this.CommissionFormdata = JSON.parse(storedData);
   }

   this.loadData()
 }

 getCommisions(id: any) {
   this.commissionservice
     .getCommissionById(this.getIdFromResponse)
     .subscribe((response: any) => {
       console.log('response  ', response);

       this.CommissionFormdata.push(response);
       localStorage.setItem(
         'commissions',
         JSON.stringify(this.CommissionFormdata)
       );
     });
 }
 getSelectedData(id: number) {
  this.fetchId = id;
  this.fetchDataBasedId = this.CommissionFormdata.find((item: any) => item[0].commissionId == this.fetchId);
  if (this.fetchDataBasedId) {
    this.editCommissionForm.patchValue({
      isPercentage: this.fetchDataBasedId[0].isPercentage,
      amount: this.fetchDataBasedId[0].amount,
      status: this.fetchDataBasedId[0].status,
      carrierName: this.fetchDataBasedId[0].carrierName,
      serviceName: this.fetchDataBasedId[0].serviceName
    });
  }
}


 loadData(): void {
   this.supplierservice.getData().subscribe((data: any[]) => {
     this.apiData = data;

     this.serviceProviderTypes = [
       ...new Set(data.map((item) => item.serviceProviderType)),
     ];
     this.serviceNames = data.map((item) => item.serviceName);
     console.log('apidata', this.apiData);
     console.log('service provider types', this.serviceProviderTypes);
     console.log('service names', this.serviceNames);
   });
 }



 filterCarrierId() {
   const selectedType = this.commissionForm.get('carrierName')?.value;
   const selectedService = this.commissionForm.get('serviceName')?.value;
   console.log('Selected Service:', selectedService);

   console.log('API Data:', this.apiData);

   const cutData = this.apiData.find(
     (item) => item.serviceName === selectedService
   );
   console.log('Cutted Data:', cutData);

   if (cutData) {
     // Handle the case when cutData is found
     // this.carrierId = cutData.carrierId; // Assuming carrierId is the correct field to assign
     this.carrierId = cutData.id.toString();
     console.log('Carrier ID:', this.carrierId);
     console.log('My service id', this.carrierId);
     this.commissionForm.patchValue({ carrierId: this.carrierId });
     this.commissionForm.patchValue({ id: this.Id });
   } else {
     // Handle the case when cutData is not found
     console.log('No matching data found for selected type:', selectedType);
   }
 }

 GetServiceNames():void{
   const selectedService=this.commissionForm.get('serviceName')?.value;
   
   console.log("selected service in filterservice name ",selectedService);
   const cutData = this.apiData.find(
     (item) => item.serviceName === selectedService
   );
   console.log("cutdata",cutData);
   if(cutData){
     this.carrierId = cutData.id
     console.log("carrier id in getServicenames",this.carrierId);
     this.commissionForm.patchValue({ carrierId: this.carrierId.toString() });
     this.commissionForm.patchValue({ id: this.Id });
   }
   
   
 }
 deleteCommission(id:number){
 
     this.fetchDataBasedId=id
      const filteredData=this.CommissionFormdata.find((item:any)=>item[0].commissionId==this.fetchDataBasedId)
      console.log("filter",filteredData);
      const storedId=filteredData[0].commissionId
       
     console.log("store id",storedId);
     if(storedId){
       this.commissionservice.deleteCommission(this.fetchDataBasedId).subscribe((response:any)=>{
     this.toast.success(response.message)
     
       },
     (error:any)=>{
     this.toast.error('Delete Commission Failed')
     })
     }
     
     }

 filterServiceNames(): void {
   const selectedType = this.commissionForm.get('carrierName')?.value;
   console.log('Selected Type:', selectedType);
   const selectedService=this.commissionForm.get('serviceName')?.value;
   // console.log("selected service in filterservice name ",selectedService);

   if (selectedType) {
     console.log("Selected Type");
     
     this.filteredServices = this.apiData
       .filter((item) => item.serviceProviderType === selectedType)
       .map((item) => item.serviceName);
     this.filterCarrierId();
     console.log('Filtered Services:', this.filteredServices);
   } else {
     this.filteredServices = [];
     console.log('Filtered Services (empty):', this.filteredServices);
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
     console.log(formDataToSend);

     this.commissionservice.postCommission(formDataToSend).subscribe(
       (response) => {
         if(response.message){
           this.toast.error(response.message)
         }
         console.log('Post Commission Successful:', response);
        
         
         this.getIdFromResponse = response.id;

         console.log('id from response', this.getIdFromResponse);
         this.getCommisions(this.getIdFromResponse);
         // this.commissionForm.reset();

         // Handle success, reset form, display success message, etc.
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
   if (payment == 'dollar') {
     this.value = false;
   }
   if (payment == 'percent') {
     this.value = true;
   }
   this.commissionForm.patchValue({ isPercentage: this.value });
 }
 getFormattedDate(value:any){
  const date = new Date(value);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  this.formattedDate = `${day}-${month}-${year}`;
  return this.formattedDate;
}
}


