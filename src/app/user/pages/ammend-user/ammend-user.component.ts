import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-ammend-user',
  templateUrl: './ammend-user.component.html',
  styleUrls: ['./ammend-user.component.css']
})
export class AmmendUserComponent implements OnInit {
  userForm!: FormGroup;
  userID: any;
  userData: any;

  constructor(private userService: UserService, private toast: HotToastService, private authService: AuthService,private router:Router,private activatedroute:ActivatedRoute) { 
    this.userForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      phoneNumber: new FormControl(''),
      name: new FormControl(''),
      accountType: new FormControl(''),
      abn: new FormControl(''),
      abnNumber: new FormControl(''),
      companyName: new FormControl(''),
      createdDate: new FormControl(''),
      updatedOn: new FormControl(''),
      legalAcceptanceDate: new FormControl(''),
      status: new FormControl(''),
      isDeleted: new FormControl(''),
      adminCreatorId: new FormControl(''),
      country: new FormControl(''),
      city: new FormControl(''),
      profileImgPath: new FormControl(''),
      zipCode: new FormControl(''),
      limit: new FormControl(0),
      companyId: new FormControl(''),
      id: new FormControl(''),
      userName: new FormControl(''),
      normalizedUserName: new FormControl(''),
      normalizedEmail: new FormControl(''),
      emailConfirmed: new FormControl(''),
      passwordHash: new FormControl(''),
      securityStamp: new FormControl(''),
      concurrencyStamp: new FormControl(''),
      phoneNumberConfirmed: new FormControl(''),
      twoFactorEnabled: new FormControl(''),
      lockoutEnd: new FormControl(''),
      lockoutEnabled: new FormControl(''),
      accessFailedCount: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe(params => {
        this.userID = params.get('userID');
        // console.log("userID:", this.userID);
        this.fetchData();
    });
  }

  fetchData() {
    this.userService.getAllUserProfiles().subscribe(
      (res: any[]) => {
        // Filter user data based on userID
        this.userData = res.filter((user: any) => user.id === this.userID);
        // console.log("finalData:", this.userData);
        
        // Assuming userID uniquely identifies a user, so selecting the first user from the filtered array
        if (this.userData.length > 0) {
          this.userData = this.userData[0];
          this.populateForm(); // Populate form after fetching user data
        } else {
          console.log("User not found");
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  populateForm() {
    this.userForm.patchValue({
      firstName: this.userData.firstName || '',
      lastName: this.userData.lastName || '',
      email: this.userData.email || '',
      phoneNumber: this.userData.phoneNumber || '',
      name: this.userData.name ,
      accountType: this.userData.accountType ,
      abn: this.userData.abn ,
      abnNumber: this.userData.abnNumber ,
      companyName: this.userData.companyName ,
      createdDate: this.userData.createdDate ,
      updatedOn: this.userData.updatedOn ,
      legalAcceptanceDate: this.userData.legalAcceptanceDate ,
      status: this.userData.status ,
      isDeleted: this.userData.isDeleted ,
      adminCreatorId: this.userData.adminCreatorId ,
      country: this.userData.country ,
      city: this.userData.city ,
      profileImgPath: this.userData.profileImgPath ,
      zipCode: this.userData.zipCode ,
      limit: this.userData.limit ,
      companyId: this.userData.companyId ,
      id: this.userData.id ,
      userName: this.userData.userName ,
      normalizedUserName: this.userData.normalizedUserName ,
      normalizedEmail: this.userData.normalizedEmail ,
      emailConfirmed: this.userData.emailConfirmed ,
      passwordHash: this.userData.passwordHash ,
      securityStamp: this.userData.securityStamp ,
      concurrencyStamp: this.userData.concurrencyStamp ,
      phoneNumberConfirmed: this.userData.phoneNumberConfirmed ,
      twoFactorEnabled: this.userData.twoFactorEnabled ,
      lockoutEnd: this.userData.lockoutEnd ,
      lockoutEnabled: this.userData.lockoutEnabled ,
      accessFailedCount: this.userData.accessFailedCount 
    });
  }
  
  onSubmit() {
    // console.log("Updated Form Values:", this.userForm.value);
    // Assuming updateUserProfile takes userID and form data
    this.userService.updateUserProfile(this.userForm.value).subscribe(
      (res: any) => {
        // Handle success response
        this.toast.success('User updated successfully')
        console.log("Update successful:", res);
      },
      (error) => {
        // Handle error response
        console.log("Error updating user:", error);
        this.toast.error('Error updating user')
      }
    );
  }
}
