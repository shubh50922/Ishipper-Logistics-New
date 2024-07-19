import { Component, OnInit } from '@angular/core';
import { SupplierService } from 'src/app/core/services/supplier.service';
@Component({
  selector: 'app-super-admin-form',
  templateUrl: './super-admin-form.component.html',
  styleUrls: ['./super-admin-form.component.css']
})
export class SuperAdminFormComponent implements OnInit {
availableServices!:any[]
isPercentage:boolean=false
 serviceProviderSet = new Set<string>();
  constructor(private supplierservice:SupplierService) { 

  }

  getServices(): void {
    this.supplierservice.getData().subscribe((response: any) => {
      this.availableServices = response;
      
      
      this.serviceProviderSet.clear(); // Clear the set before populating it
      this.availableServices.forEach(service => {
        this.serviceProviderSet.add(service.serviceProviderType);
      });
      console.log("service provider set", this.serviceProviderSet);
      
      console.log("response in super admin form", this.availableServices);
    });
  }
  ngOnInit(): void {
    this.getServices()
  }
  onRadioChange(value: string): void {
    this.isPercentage = (value === 'percent');
    console.log("by %",this.isPercentage);
    
  }
}
