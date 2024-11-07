import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  resetForm!: FormGroup;
  resetResponse:any
  errorMessage: any
  successMessage: boolean = false;
  isLoading: boolean = false;
  constructor(private authService:AuthService,private toast:HotToastService, private fb: FormBuilder, ) { }

  ngOnInit(): void {
    this.resetForm=this.fb.group({
     email:['',Validators.required],
      
          })
  }
postEmail(){
  console.log("reset email",this.resetForm.value);
  
  this.errorMessage=''
  this.successMessage=false
  this.isLoading=true
  this.authService.postEmailforReset(this.resetForm.get('email')?.value).subscribe((response:any)=>{
if(response){
  this.isLoading=false

  this.resetResponse=response
  
  if (this.resetResponse.message==='Password reset link has been sent to your email.'){
this.successMessage=true
  }
   
    
  console.log("response on valid email",this.resetResponse);
  
}
  },
  (error: any) => {
         
    console.log('error', error);
    this.successMessage = false;
    this.isLoading = false;
    // this.handleError(error);

    this.errorMessage = error.error.message;
  }
);
}
}
