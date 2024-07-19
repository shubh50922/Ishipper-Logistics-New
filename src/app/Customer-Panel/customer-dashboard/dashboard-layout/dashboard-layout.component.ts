import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent implements OnInit {
value:any=''
isActive(value:string){
  return value
 }   
  constructor() { }

  ngOnInit(): void {
  }

}
