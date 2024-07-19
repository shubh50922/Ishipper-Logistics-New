import { Component, OnInit } from '@angular/core';
import { CoreService } from '../../services/core.service';
import { AuthService } from '../../services/auth.service';
import { ProfileService } from '../../services/profile.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-customer-layout',
  templateUrl: './customer-layout.component.html',
  styleUrls: ['./customer-layout.component.css']
})
export class CustomerLayoutComponent implements OnInit {
  value:string=''
  user:any={}
  idFromUsers:any
  userRole: any;
  tobedecryptedData: any;
  decryptedinfo: any;
  finalName: any;
  constructor( private coreService:CoreService,private router:Router,private authService:AuthService,private profileService:ProfileService) { }
  toggleSidebar() {
    document.querySelector('.sidebar')?.classList.toggle('show');
  }

  toggleExpandContent() {
    document.querySelector('.dashboard_wrapper')?.classList.toggle('expand_class');
  }
  isActive(value:string){
    return value
   }   
    
    logoutProcess(){
      console.log("bhago Shubhanshi ji eeeeeee ");
      this.coreService.clearToken()
      this.router.navigate(['/']);
       }
  getUserName(ID:string){
  this.profileService.getUserById(ID).subscribe((response:any)=>{
    this.user=response.message
  })
  }
  ngOnInit(): void {
    this.idFromUsers = this.authService.getUserId();
    this.getUserName(this.idFromUsers)
    this.getUserRole(this.userRole)
    this.decryptData()
  }
  getUserRole(roles:any) {
    this.userRole = localStorage.getItem('role');
    console.log('Role', this.userRole);
    // roles=this.userRole
  }
  decryptData() {
    this.tobedecryptedData = localStorage.getItem('user');
    if (this.tobedecryptedData) {
      console.log("inside decrypted");
      
      const decryptedString = this.authService.decrypt(this.tobedecryptedData);
      const decryptedData = JSON.parse(decryptedString);
      this.decryptedinfo = decryptedData;
      console.log('user:', this.decryptedinfo);
      this.decryptedinfo.user.firstName = this.decryptedinfo.user.name;
      this.finalName = this.decryptedinfo.user.firstName;
    } else {
      console.log("No data to decrypt");
    }
  }
}

