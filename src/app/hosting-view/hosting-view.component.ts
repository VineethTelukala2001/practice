import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-hosting-view',
  templateUrl: './hosting-view.component.html',
  styleUrls: ['./hosting-view.component.css']
})
export class HostingViewComponent implements OnInit {

  role: any;
  dashboardrole: boolean = false;
  adminrole: boolean = false;
  domainrole: boolean = false;
  hostingrole: boolean = false;
  hostdomainrole: boolean = false;
  emailrole: boolean = false;
  itreturnsrole: boolean = false;
  passwordsrole: boolean = false;


  totalCount = 0
  page = 1;
  pageSize = 10;
  p = 1;
  displayDialog: boolean = false;
  hostingDetails: any[] = [];
  hosting: any[] = []
  searchText: any
  allhostingDetails: any;
  isAscendingSort: boolean = true;
  isAscendingSort1: boolean = true;
  isAscendingSort2: boolean = true;
  deleteId: any;
  displayLogoutDialog: boolean = false;
  displayDeleteDialog: boolean = false;

  sortedColumn: string = '';
  sortDirection: number = 1; // 1 for ascending, -1 for descending
  sort(column: string) {
    if (this.sortedColumn === column) {
      this.sortDirection *= -1;
    } else {
      this.sortedColumn = column;
      this.sortDirection = 1;
    }
  }
  compareValues(a: any, b: any) {
    if (a < b) {
      return -1;
    } else if (a > b) {
      return 1;
    } else {
      return 0;
    }
  }
  



  constructor(
    private router:Router,
    private apiservice:ApiService,
    private messageService: MessageService
  ) { 
    this.viewhosting()
    this.role=sessionStorage.getItem('role')
      if(this.role == 'Admin'){
        this.dashboardrole = true;
        this.adminrole = true;
        this.domainrole = true;
        this.hostingrole = true;
        this.hostdomainrole = true;
        this.emailrole = true;
        this.itreturnsrole = true;
        this.passwordsrole = true;
      }
      else if (this.role == 'Hosting'){
        this.domainrole = true;
        this.hostingrole = true;
        this.hostdomainrole = true;
      }
      else if(this.role == 'Email'){
        this.emailrole = true;
      }
      else if(this.role == 'IT Returns'){
        this.itreturnsrole = true;
      }
  }

  ngOnInit(): void {
    
    // this.apiservice.viewhosting().subscribe((data: any) => {
    //   this.hostings = data;
    //   this.allhostings = data;
    //   console.log(data);
    // });
    // this.viewhosting();
    
  }
  pageChange(event: number) {
    this.page = event;
     this.viewhosting()
   }
   viewhosting() {
    this.apiservice.viewhosting().subscribe((data: any) => {
      this.hostingDetails = data
      this.allhostingDetails = data
      this.totalCount = this.hostingDetails.length
    })

  }
  adduser() {
    this.router.navigate(['/hosting-register'])
}
showDialog() {
  this.displayLogoutDialog = true;
}
logoutConfirmation() {
  this.displayLogoutDialog = true; // Show logout confirmation dialog
}

logout() {
  // alert('Logging out...');
  
  this.displayLogoutDialog = false;
  this.router.navigate(['/login']);
}

cancelLogout() {
  this.displayLogoutDialog = false;
}
isActive(route: string): boolean {
  return this.router.isActive(route, true);
}
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase();
  
    if (!filterValue) {
      this.hostingDetails = this.allhostingDetails;
    } else {
      this.hostingDetails = this.allhostingDetails.filter((hosting: any) => {
        if (hosting && typeof hosting === 'object') {
          const hostingIdString = (hosting.hostingId || '').toString().toLowerCase();
          const hostingProviderString = (hosting.hostingProvider || '').toLowerCase();
          // const hostingPurchaDateString = (hosting.hostingPurchaDate || '').toLowerCase();
          // const hostingExpireDateString = (hosting.hostingExpireDate || '').toString().toLowerCase();
          const registrationDomainString = (hosting.registrationDomain || '').toLowerCase();
          // const registrationEmailIdString = (hosting.registrationEmailId || '').toLowerCase();
          const registrationDateString = (hosting.registrationDate || '').toLowerCase(); // Add this line
          const expiryDateString = (hosting.expiryDate || '').toString().toLowerCase(); // Add this line
  
          return (
            hostingIdString.includes(filterValue) ||
            hostingProviderString.includes(filterValue) ||
            // hostingPurchaDateString.includes(filterValue) ||
            // hostingExpireDateString.includes(filterValue) ||
            registrationDomainString.includes(filterValue) ||
            // registrationEmailIdString.includes(filterValue) ||
            registrationDateString.includes(filterValue) || // Include the new properties
            expiryDateString.includes(filterValue) // Include the new properties
          );
        }
        return false; // If hosting is undefined or not an object, exclude it from the filtered result
      });
    }
  }
  
  

  toggleSorting() {
    this.isAscendingSort = !this.isAscendingSort;
    // Implement your sorting logic here based on the current sorting state.
  }
  toggleSorting1(){
    this.isAscendingSort1 = !this.isAscendingSort1;
  }

  toggleSorting2(){
    this.isAscendingSort2 = !this.isAscendingSort2;
  }
  edit(id: string, val: string) {
    this.router.navigate(['/hosting-register', id, val])
  }  

// deletehosting(id:any) {
//   this.apiservice.deletehosting(id).subscribe(
//     (data: any) => {
//       console.log(data)
      
//       // this.getinvoice()
//       this.hostingDetails = this.hostingDetails.filter(hosting => hosting.hostingId !== id);
//     },
//     error => {
//       console.error('Error deleting domain:', error);
//     }
//     );

// }

deletehosting(id: any) {
  this.deleteId = id;
  this.displayDeleteDialog = true; 
}

confirmDelete() {
  if (this.deleteId) {
    this.apiservice.deletehosting(this.deleteId).subscribe(
      (data: any) => {
        console.log(data);
        this.hostingDetails = this.hostingDetails.filter(hosting => hosting.hostingId !== this.deleteId);
      },
      error => {
        console.error('Error deleting domain:', error);
      }
    );
  }
  this.displayDeleteDialog = false;
}

cancelDelete() {
  this.displayDeleteDialog = false;
}


}