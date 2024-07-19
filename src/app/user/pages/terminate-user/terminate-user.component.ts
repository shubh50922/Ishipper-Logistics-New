import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { HotToastService } from '@ngneat/hot-toast';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-terminate-user',
  templateUrl: './terminate-user.component.html',
  styleUrls: ['./terminate-user.component.css']
})
export class TerminateUserComponent implements OnInit {
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  displayedColumns: string[] = ['Remove', 'companyId', 'userName', 'email', 'phoneNumber', 'limit', 'status'];
  selectedUserId: string | null = null;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private userService: UserService,
    private toast: HotToastService,
    private router: Router,
    private activatedroute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadUserProfiles();

  }

  loadUserProfiles() {
    this.userService.getAllUserProfiles().subscribe(
      (data: any[]) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        this.toast.error ('Unable to load data');
        console.log(error);
      }
    );
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
  }

  // editUser(userID?: string): void {
  //   if (userID) {
  //     this.router.navigate(['application/users/useradministration/ammenduser', userID]);
  //   } else {
  //     this.router.navigate(['application/users/useradministration/ammenduser']);
  //   }
  // }

deleteUser(userid: string) {
  // console.log("user id in delete",userid);
  
  this.userService.deleteUserProfile(userid).subscribe(
    response => {
      if (typeof response === 'string') {
        this.toast.success(response);
        // console.log("deleted user",response);
        
      } else if(response.status==200) {
        this.toast.success('User Deleted successfully!'); // Fallback message
      }
      this.loadUserProfiles();  // Reload profiles after deletion
    },
    error => {
      this.toast.error('Failed to Delete'); // Display error message
      console.error(error);
    }
  );
}

  
  
  
  

  openModal(userId: string) {
    this.selectedUserId = userId;
  }

  confirmDelete() {
    if (this.selectedUserId) {
      this.deleteUser(this.selectedUserId);
      this.selectedUserId = null;
    }
  }
}
