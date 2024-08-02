import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent implements OnInit {
  activeTab!: string;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // Subscribe to router events to get the active tab
    this.router.events.subscribe(() => {
      this.activeTab = this.route.snapshot.firstChild?.routeConfig?.path || '';
    });
  }
}