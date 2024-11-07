import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

token: string | null = null;
  email: string | null = null;
storepwResponse:any
pwresetForm!: FormGroup;
  constructor(private route: ActivatedRoute,private authService:AuthService,private toast:HotToastService, private fb: FormBuilder) { }

  ngOnInit(): void {
    // Initialize the form with validation
    this.pwresetForm = this.fb.group({
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', Validators.required],
    }, { validator: this.passwordsMatchValidator });

    // Get URL parameters
    this.route.queryParams.subscribe(params => {
      if (params['token']) {
        // Decode the token and replace necessary characters
        this.token = decodeURIComponent(params['token'])
          .replace(/ /g, '+')  // Replace spaces with `+`
          .replace(/%2F/g, '/');  // Replace `%2F` with `/`
    
        console.log('Processed Token:', this.token);
      }
      this.email = params['email'];
      console.log('Token:', this.token);
      console.log('Email:', this.email);
    });
  }
  passwordsMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { mismatch: true };
  }

  setPassword() {
    if (this.pwresetForm.invalid) {
      this.toast.error('Please fill out all fields correctly.');
      return;
    }

    // Prepare the payload
    const data = {
      email: this.email,
      token: this.token,
      newPassword: this.pwresetForm.get('newPassword')?.value,
      confirmPassword: this.pwresetForm.get('confirmPassword')?.value
    };

    // Call the AuthService to set the new password
    this.authService.SetNewPassword(data).subscribe({
      next: (response: any) => {
        this.storepwResponse = response;
        this.toast.success('Password has been successfully reset.');
        console.log("Password reset response:", this.storepwResponse);
      },
      error: (error) => {
        console.error('Password reset error:', error);
        this.toast.error('An error occurred while resetting your password.');
      }
    });
  }
}