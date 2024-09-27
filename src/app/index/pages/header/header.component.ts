import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/core/services/core.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public value: string = 'login';
  userRole: any;

  constructor(private coreService: CoreService, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.value = 'logout';
    } else {
      this.value = 'login';
    }

    // Getting User Role 
    this.userRole = localStorage.getItem('role');
    
  }
  homeLogout() {
    this.coreService.clearToken();
    localStorage.clear();
    this.value = 'login';
  }
}
