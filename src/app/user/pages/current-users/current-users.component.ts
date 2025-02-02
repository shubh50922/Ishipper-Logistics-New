import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { HotToastService } from '@ngneat/hot-toast';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { SuperadminDetailService } from 'src/app/core/services/superadmin-detail.service';
@Component({
  selector: 'app-current-users',
  templateUrl: './current-users.component.html',
  styleUrls: ['./current-users.component.css'],
})
export class CurrentUsersComponent implements OnInit {
  isLoading: boolean = false;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  searchText: string = '';
  storedUser!: any[];
  getUserCompanyId: any;
  tobedecryptedData!: any;
  decryptedinfo!: any;
  filteredUsers!: any[];
  selectedCompany: string = ''; // To store the selected company ID
  companies!: any[];
  // Example list of companies
  // companies = [
  //   { id: '1', name: 'Company A' },
  //   { id: '2', name: 'Company B' },
  //   { id: '3', name: 'Company C' }
  // ];
  filterCriteria: string = 'name';
  filterStatus: boolean | null = null; // To track the status filter
  showStatusDropdown: boolean = false; // To track dropdown visibility
  displayType: string = '';
  displayedColumns: string[] = [
    'companyId',
    'orderDate',
    'name',
    'address',
    'email',
    'status',
    'edit',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private userService: UserService,
    private toast: HotToastService,
    private router: Router,
    private authService: AuthService,
    private superadminDetailService: SuperadminDetailService
  ) {}

  ngOnInit(): void {
    this.decryptData();
    this.loadUserProfiles
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  decryptData() {
    // this.tobedecryptedData = localStorage.getItem('user');

    // if (this.tobedecryptedData) {
    //   const decryptedString = this.authService.decrypt(this.tobedecryptedData);
    //   const decryptedData = JSON.parse(decryptedString);
    //   this.decryptedinfo=decryptedData.companyId
    // console.log('user:', this.decryptedinfo);
    // this.loadUserProfiles();

    const getUser: any = localStorage.getItem('user');
    // console.log("get user in add user", getUser);
    const decryptUser = this.authService.decrypt(getUser);
    //  console.log("decrypt user in add user",decryptUser);
    const userData = JSON.parse(decryptUser);
    //  console.log("parsed data in add user",userData);
    this.getUserCompanyId = userData.user.companyId;
    //  console.log("company id in add user",this.getUserCompanyId);

    this.loadUserProfiles();
  }
  loadUserProfiles() {
    this.userService.getAllUserProfiles().subscribe(
      (data: any[]) => {
        this.storedUser = data;
        console.log("stored user",this.storedUser);
console.log(this.selectedCompany,"stfcjhbjkbnkljjnk");
this.getCompaniesInDropdown()
        // Filter users based on decrypted company ID
       
        console.log('filter ', this.filteredUsers);
       
          this.dataSource.data = this.storedUser;
        
        // console.log("filtered data",this.filteredUsers);
        if ((this.displayType = 'general')) {
          this.dataSource.data = this.displayGeneralUsers();
        }
        if ((this.displayType = 'company')) {
          this.dataSource.data = this.displayCompany();
        }
        this.dataSource.paginator = this.paginator;
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = true;
        this.toast.error('Unable to load data');
        console.log(error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.searchText = filterValue; // Save the search text for later use
    this.filterData();
  }

  setFilterCriteria(criteria: string) {
    this.filterCriteria = criteria;
    // console.log(criteria);
  }

  filterByStatus(status: boolean | null) {
    this.filterStatus = status;
    // console.log('status', this.filterStatus);
    if (!status) {
      const trueUsers = this.filteredUsers.filter(
        (user) => user.status === false
      );
      this.dataSource.data = trueUsers;
    } else {
      const falseUsers = this.filteredUsers.filter(
        (user) => user.status === null
      );
      this.dataSource.data = falseUsers;
    }
    this.filterData();
  }

  filterData() {
    this.dataSource.filterPredicate = (data, filter) => {
      // Check if the text matches
      const textMatch = () => {
        switch (this.filterCriteria) {
          case 'name':
            return data.name.toLowerCase().includes(filter);
          case 'email':
            return data.email.toLowerCase().includes(filter);
          default:
            return true;
        }
      };
      return textMatch();
    };
    this.dataSource.filter = this.searchText; // Trigger the filter
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    // Fetch data for the current page
    // You can make API calls with pagination parameters like startIndex and endIndex
    // Example: this.userService.getUserProfiles(startIndex, endIndex)
  }

  editUser(userID?: string): void {
    if (userID) {
      this.router.navigate([
        'application/users/useradministration/ammenduser',
        userID,
      ]);
    } else {
      this.router.navigate(['application/users/useradministration/ammenduser']);
    }
  }
  getCompaniesInDropdown() {
    this.superadminDetailService
      .getCompanyDetails()
      .subscribe((response: any) => {
        this.companies = response;
        
        console.log('response in get companies', response);
    
      });
  }
  displayGeneralUsers() {
    const generalUsers = this.storedUser.filter(
      (user: any) => (user.abn === false && user.email !== 'sahil123@gmail.com')
    );
    console.log('display general users', generalUsers);
    return generalUsers;
  }
  displayCompany() {
    if (this.companies && this.companies.length > 0) {
      const companyUsers = this.storedUser.filter((user: any) => user.companyId == this.selectedCompany);
      console.log("company users", companyUsers);
      return companyUsers;
    } else {
      console.warn("Companies data is not available.");
      return [];
    }
  }
  
}
