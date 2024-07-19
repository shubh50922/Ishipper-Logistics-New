import { Component, OnInit } from '@angular/core';
import { CoreService } from '../../services/core.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-project-layout',
  templateUrl: './project-layout.component.html',
  styleUrls: ['./project-layout.component.css'],
})
export class ProjectLayoutComponent implements OnInit {
  value: string = '';
  user: any = {};
  idFromUsers: any;
  tobedecryptedData: any;
  decryptedinfo: any;
  finalName: any;
  userRole: any;

  constructor(
    private coreService: CoreService,
    private router: Router,
    private authService: AuthService,
    private profileService: ProfileService
  ) {}

  toggleSidebar() {
    document.querySelector('.sidebar')?.classList.toggle('show');
  }

  toggleExpandContent() {
    document
      .querySelector('.dashboard_wrapper')
      ?.classList.toggle('expand_class');
  }

  getUserRole(roles:any) {
    this.userRole = localStorage.getItem('role');
    // console.log('Role', this.userRole);
    // roles=this.userRole
  }
  
  isActive(value: string) {
    return value;
  }

  decryptData() {
    this.tobedecryptedData = localStorage.getItem('user');
    if (this.tobedecryptedData) {
      // console.log("inside decrypted");
      
      const decryptedString = this.authService.decrypt(this.tobedecryptedData);
      const decryptedData = JSON.parse(decryptedString);
      this.decryptedinfo = decryptedData;
      // console.log('user:', this.decryptedinfo);
      this.decryptedinfo.user.firstName = this.decryptedinfo.user.name;
      this.finalName = this.decryptedinfo.user.firstName;
      const StoredUserId=this.decryptedinfo.user.id
      console.log("user id in project layout");
      

    } else {
      // console.log("No data to decrypt");
    }
  }

  logoutProcess() {
    this.coreService.clearToken();
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    // console.log("ngOnInit called");
    this.idFromUsers = this.authService.getUserId();
    // console.log('-->', this.idFromUsers);
    this.user = this.idFromUsers;
    this.coreService.CheckPermission();
    this.decryptData();
    this.getUserRole(this.userRole);
  }
  
}
