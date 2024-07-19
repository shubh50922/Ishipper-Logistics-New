import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProfileService } from 'src/app/core/services/profile.service';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  idFromUsers:any
user:any={}
  constructor(private authService:AuthService,private profileService:ProfileService) { }

  ngOnInit(): void {
    this.idFromUsers = this.authService.getUserId();
    this.getUserInProfile(this.idFromUsers)
  
  }
  getUserInProfile(ID:string){
this.profileService.getUserById(ID).subscribe(
  response => {
  this.user=response.message
  },
  error => {
   
  })}
  



}
