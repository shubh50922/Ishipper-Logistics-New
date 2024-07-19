import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { SupplierService } from 'src/app/core/services/supplier.service';

@Component({
  selector: 'app-supplier-management',
  templateUrl: './supplier-management.component.html',
  styleUrls: ['./supplier-management.component.css'],
})
export class SupplierManagementComponent implements OnInit {
  serviceProviderData: any[] = [];
  idFromUsers!: any;
  getCompanyId!: any;
  updatedServices: any[] = [];
  savedServicesfromApi: any[] = [];
  filteredServices: any[] = [];
  changedServices: any[] = [];
  serviceMap = new Map();
defaultstatus:boolean=false
  constructor(
    private authService: AuthService,
    private supplierService: SupplierService
  ) {}

  ngOnInit(): void {
   this.getUserId(this.idFromUsers)
      this.showData();

    this.updateUserSettings(this.idFromUsers);
  }
  getUserId(Id:number){
    const savedUser=localStorage.getItem('user')
    if(savedUser){
      const decodeUser=this.authService.decrypt(savedUser)
      if(decodeUser){
        const parsedUser=JSON.parse(decodeUser)
        if(parsedUser){
          this.idFromUsers=parsedUser.user.id
        }
      }
    }
  }
  showData() {
    if (this.idFromUsers) {
      this.supplierService.getData().subscribe(
        (response) => {
          this.serviceProviderData = response;
          status: false 
          // console.log('Initial fetched data', this.serviceProviderData);
          this.groupData();
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
    } else {
      console.error('User ID not available');
    }
  }

  groupData() {
    this.serviceProviderData = this.groupBy(
      this.serviceProviderData,
      'serviceProviderType'
    );
  }

  groupBy(data: any[], key: string): any[] {
    return data.reduce((result, currentValue) => {
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );
      return result;
    }, {});
  }

  toggleServiceStatus(service: any, Id: any) {
    service.status = !service.status;
    // console.log('services ', service);

    this.updatedServices.push({
      id: Id,
      userId: this.idFromUsers,
      carrierId: service.id,
      isEnabled: service.status,
    });

    Object.keys(this.serviceProviderData).forEach((providerType: any) => {
      this.serviceProviderData[providerType].forEach((service: any) => {
        const matchingSetting = this.updatedServices.find(
          (setting) => setting.carrierId === service.id
        );

        if (matchingSetting) {
          service.status = matchingSetting.isEnabled;
        }

        this.serviceMap.set(service.id, service);
      });
    });

    // console.log('myupdatedService====', Array.from(this.serviceMap.values()));
  }

  saveSettings() {
    if (this.updatedServices.length > 0) {
      const allServices: any[] = Array.from(this.serviceMap.values()).map(service => ({
        id: 0,
        userId: this.idFromUsers,
        carrierId: service.id,
        isEnabled: service.status
      }));

      this.supplierService.saveSettings(allServices, this.idFromUsers).subscribe(
        (response) => {
          // console.log('Settings saved successfully:', response);
          this.updatedServices = [];
          window.location.reload();
        },
        (error) => {
          console.error('Error saving settings:', error);
        }
      );
    } else {
      // console.log('No changes to save.');
    }
  }

  updateUserSettings(ID: string) {
    this.supplierService.getUserSettings(ID).subscribe((response) => {
      this.savedServicesfromApi = response;
      // console.log('get user settings in updated method', this.savedServicesfromApi);
      this.applyUserSettings();
    });
  }

  applyUserSettings() {
    Object.keys(this.serviceProviderData).forEach((providerType: any) => {
      this.serviceProviderData[providerType].forEach((service: any) => {
        const matchingSetting = this.savedServicesfromApi.find(
          (setting) => setting.carrierId === service.id
        );

        if (matchingSetting) {
          service.status = matchingSetting.isEnabled;
        }
      });
    });

    // console.log('Updated serviceProviderData with user settings:', this.serviceProviderData);
  }
}
