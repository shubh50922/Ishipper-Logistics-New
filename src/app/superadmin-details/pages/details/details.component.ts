import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup,FormBuilder,Validators} from '@angular/forms';
import { SuperadminDetailService } from 'src/app/core/services/superadmin-detail.service';
import { HotToastService } from '@ngneat/hot-toast';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  savedCompanies: any;
  selectedId!: number;
  dataToEdit: any;
  editCommissionForm!: FormGroup;
  constructor(
    private superadminDetailService: SuperadminDetailService,
    private formBuilder: FormBuilder,
    private toast: HotToastService
  ) {}

  ngOnInit(): void {
    this.getCompanies();
    this.editCommissionForm=this.formBuilder.group({
      companyName:[''],
      abnNumber:[''],
      status:['',Validators.required],
      createdBy:['']
    })
  }
  // "id": 36,
  //         "companyName": "rr1",
  //         "abnNumber": "45623477662",
  //         "status": true,
  //         "createdBy": "e8f0a397-da3a-4ee7-ae9a-2d59e2997a3b",
  //         "createdByName": "ronny42"
  getCompanies() {
    this.superadminDetailService
      .getCompanyDetails()
      .subscribe((response: any) => {
        this.savedCompanies = response;
        console.log('saved companies', response);
      });
  }
  fetchId(Id: number) {
    this.selectedId = Id;
    console.log('fetched company id', this.selectedId);
    if (this.selectedId) {
      this.dataToEdit = this.savedCompanies.find(
        (item: any) => item.id === this.selectedId
      );
      console.log('data to edit', this.dataToEdit);
    }
    if(this.dataToEdit){
      this.editCommissionForm.patchValue({
        companyName:this.dataToEdit. companyName,
        abnNumber:this.dataToEdit.abnNumber,
        status:this.dataToEdit.status,
        createdBy:this.dataToEdit.createdBy
      })
      console.log("edit form",this.editCommissionForm.value);
      
    }
  }
  confirmEdit(){
    if(this.editCommissionForm.valid){
      const formData:any={
        id:this.selectedId,
        status: this.editCommissionForm.get('status')?.value === 'true',
      };
      this.superadminDetailService.updateCompanyStatus(formData).subscribe((response:any)=>{
        this.toast.success("Status updated sucessfully")
      },(error:any)=>{
        this.toast.error("Status updation failed!")
      })
    }
  }
}
