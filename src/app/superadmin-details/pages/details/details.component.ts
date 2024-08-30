import { Component, OnInit,ViewChild } from '@angular/core';
import {FormControl,FormGroup,FormBuilder,Validators} from '@angular/forms';
import { SuperadminDetailService } from 'src/app/core/services/superadmin-detail.service';
import { HotToastService } from '@ngneat/hot-toast';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  displayedColumns: string[] = ['companyName', 'abnNumber', 'createdByName', 'status', 'action'];
  dataSource!: MatTableDataSource<any>;
  savedCompanies: any;
  selectedId!: number;
  dataToEdit: any;
  editCommissionForm!: FormGroup;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
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
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  fetchId(Id: number) {
    const selectedId = Id;
    console.log('fetched company id', selectedId);

    const dataToEdit = this.dataSource.data.find((item: any) => item.id === selectedId);
    console.log('data to edit', dataToEdit);

    if (dataToEdit) {
      this.editCommissionForm.patchValue({
        companyName: dataToEdit.companyName,
        abnNumber: dataToEdit.abnNumber,
        status: dataToEdit.status,
        createdBy: dataToEdit.createdByName,
      });
      console.log('edit form', this.editCommissionForm.value);
    }
  }
  confirmEdit() {
    if (this.editCommissionForm.valid) {
      const formData: any = {
        id: this.selectedId,
        status: this.editCommissionForm.get('status')?.value === 'true',
      };
      this.superadminDetailService.updateCompanyStatus(formData).subscribe(
        (response: any) => {
          this.toast.success('Status updated successfully');
          this.getCompanies();
        },
        (error: any) => {
          this.toast.error('Status updation failed!');
        }
      );
    }
  }
}