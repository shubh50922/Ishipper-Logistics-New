import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  getUserCompanyId!: any;
  userForm!: FormGroup;
  integerRegex = /^\d+$/;
  emailRegex = '\\w+([-+.\']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*';
  registrationError: string | null = null;

  constructor(private userService: UserService, private toast: HotToastService, private authService: AuthService) { 
    this.userForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getCompanyId()
  }
  getCompanyId(){
   
    // console.log("add user company id",this.getUserCompanyId);
    const getUser:any=localStorage.getItem('user')
    // console.log("get user in add user", getUser);
   const decryptUser=this.authService.decrypt(getUser)
  //  console.log("decrypt user in add user",decryptUser);
   const userData=JSON.parse(decryptUser)
  //  console.log("parsed data in add user",userData);
   this.getUserCompanyId=userData.user.companyId
  //  console.log("company id in add user",this.getUserCompanyId);
   
    
  }
  onSubmit() {
    if (this.userForm.valid) {
      this.userForm.value.companyId = this.getUserCompanyId;
      this.userService.registercoUser(this.userForm.value).subscribe(
        response => {
          this.toast.success('User registered successfully!');
          this.userForm.reset();
        },
        error => {
          this.toast.error('Failed to register user. Please try again.');
          console.error(error);
        }
      );
    } else {
      this.toast.error('Please fill out the form correctly.');
    }
  }

 
  
  }
    
