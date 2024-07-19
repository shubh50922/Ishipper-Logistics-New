import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators,FormControl, AbstractControl } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { MustMatch } from '../../must-match.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
   userForm!: FormGroup;
   submitted:boolean = false;
   isLoading:boolean= false;
   integerRegex = /^\d+$/;
emailRegex = '\\w+([-+.\']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*';
   registrationError: string | null = null;
  getUserFormData(data:any){
    console.warn(data)
  }
  
  constructor(private authService:AuthService,private toast: HotToastService,private router:Router){}

  ngOnInit() {
    this.userForm=new FormGroup({
      name: new FormControl('', [Validators.required,Validators.maxLength(32)]),
       firstName: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.maxLength(32),Validators.pattern(this.emailRegex)]),
      phoneNumber: new FormControl('', [Validators.required,Validators.maxLength(10),Validators.minLength(10),Validators.pattern(this.integerRegex)]),
      accountType: new FormControl('',[Validators.required]),
      abn: new FormControl(false),
      abnNumber: new FormControl(null,[Validators.maxLength(11),Validators.minLength(11)]),
      password: new FormControl('', [Validators.required,Validators.maxLength(32),Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required]),
      username: new FormControl('',[Validators.required,Validators.maxLength(32),Validators.minLength(8)]),
      companyName: new FormControl(null),
    },{
      validators: MustMatch('password', 'confirmPassword')
  });
}

get f() { return this.userForm.controls; }

  getvalid(name:any):AbstractControl| null{
    return this.userForm.get(name)
  }
  
    get formControls() {
      return this.userForm.controls;
    }
    onReset() {
      this.submitted = false;
      this.userForm.reset();
  }
    onSubmit(): void {
      // this.isLoading = true;
      this.submitted = true;
      // console.log('Form Value:', this.userForm.value);
      
      if (this.userForm.invalid) {
        // console.log('Form is invalid');
         return;
      }
       this.isLoading = true;
      
        // Set firstname to the value of name
    // this.userForm.controls['firstname'].setValue(this.userForm.controls['name'].value);
      
       this.authService.register(this.userForm.value).subscribe(
        response => {
          setTimeout(() => {
            this.isLoading = false;
           
           this.router.navigate(["'/auth/login'"])
            this.toast.success('Registration successful');
            this.router.navigate(['login']);
          }, 3000);
         
          // console.log('Registration successful:', response);
          // Handle success, redirect or show a success message
        },
        error => {
          this.isLoading = false;
          // console.log("er----------", error);
          //   // Check for the error format and display the appropriate message
        if (typeof error.error === 'string') {
          this.toast.error(error.error);
        } else{
          this.toast.error(error.error.message);
      }
      
        
          if (error.error && error.error.errors) {
            this.registrationError = error.error.title; 
            // console.log("err---", this.registrationError);
            
            // Set the error message to be displayed to the user
          } else {
            this.registrationError = 'An error occurred while processing your request. Please try again later.';
          }
        }
      );
    }
}

  


  
    


