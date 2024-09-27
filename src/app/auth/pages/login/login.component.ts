import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userLogin!: FormGroup;
  isShow: boolean = false;
  isLoading: boolean = false;
  getCompanyId!: any;
  adminId!: any;
userRole:any
  encryptedData!: any;
  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: HotToastService
  ) {}

  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.userLogin = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }
  loginProcess() {
    if (this.userLogin.valid) {
      this.isLoading = true;
      this.authService.login(this.userLogin.value).subscribe(
        (result: any) => {
          // console.log('MY result', result);
          if (result && result.token) {
            this.authService.saveToken(result.token);
           

            // console.log(this.adminId);
            // console.log(result);
            setTimeout(() => {
              this.isLoading = false;
              this.userRole = localStorage.getItem('role');
            //  console.log("present role",this.userRole);
             
              if(this.userRole=='Admin'){
                this.router.navigate(['/application/dashboardadmin']);

              }
             else if(this.userRole=='User'){
              this.router.navigate(['/application/replica']);
             } 
             else if(this.userRole=='SuperAdmin'){
              this.router.navigate(['/application/commission']);
             }
              this.toast.success('Login successful');
            }, 5000);
            const resultString = JSON.stringify(result);
            this.encryptedData = this.authService.encrypt(
              resultString
            );
            localStorage.setItem('user', this.encryptedData);
            // console.log("saved user",this.encryptedData);
           
            
          } else {
            this.handleError('Login failed: Invalid response');
          }
        },
        (error: any) => {
          this.handleError(
            'Login failed: ' + (error.message || 'An error occurred')
          );
        }
      );
    } else {
      this.toast.error('Invalid login form');
    }
  }

  handleError(message: string) {
    this.isLoading = false;
    console.error(message);
    this.toast.error('Login Failed');
  }
  // getUserRole(roles:any) {
   
  //   console.log('Role', this.userRole);
  //   // roles=this.userRole
  // }
  showPassword() {
    this.isShow = !this.isShow;
  }
}
