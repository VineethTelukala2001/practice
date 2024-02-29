import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-domain-view',
  templateUrl: './domain-view.component.html',
  styleUrls: ['./domain-view.component.css']
})
export class DomainViewComponent implements OnInit {

  role: any;
  dashboardrole: boolean = false;
  adminrole: boolean = false;
  domainrole: boolean = false;
  hostingrole: boolean = false;
  hostdomainrole: boolean = false;
  emailrole: boolean = false;
  itreturnsrole: boolean = false;
  passwordsrole: boolean = false;

  displayDialog: boolean = false;
  domainDetails: any[] = [];
  searchText: any
  alldomainDetails: any;
  viewdomaindata:any;
  totalCount = 0
  page = 1;
  pageSize = 10;

  displayLogoutDialog: boolean = false;
  displayDeleteDialog: boolean = false;
  deleteId: any;
  

  constructor(
    private router:Router,
    private apiservice:ApiService,
  ) { 
    this.viewdomain()
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

    // this.apiservice.viewdomain().subscribe((data: any) => {
    //   this.domains = data;
    //   this.alldomains = data;
    //   console.log(data);
    // });
    
  }
  pageChange(event: number) {
    this.page = event;
     this.viewdomain()
   }
   viewdomain() {
    this.apiservice.viewdomain().subscribe((data: any) => {
      this.domainDetails = data
      this.alldomainDetails = data
      this.totalCount = this.domainDetails.length
    })

  }
  adduser() {
    this.router.navigate(['/domain-register'])
}
showDialog() {
  this.displayLogoutDialog = true;
}
logoutConfirmation() {
  this.displayLogoutDialog = true; // Show logout confirmation dialog
}

logout() {
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
      this.domainDetails = this.alldomainDetails; // Reset to the original list if the filter is empty
    } else {
      this.domainDetails = this.alldomainDetails.filter((domain: any) => {
        const domainIdString = domain.domainId.toString().toLowerCase();
        const domainNameString = domain.domainName.toLowerCase();
        const providerNameString = domain.providerName.toLowerCase();
        const registrationDateString = domain.registrationDate.toLowerCase();
        const expiryDateString = domain.expiryDate.toString().toLowerCase();
        const registrationMobileNumberString = domain.registrationMobileNumber.toLowerCase();
        const emailIdString = domain.emailId.toLowerCase();
  
        return (
          domainIdString.includes(filterValue) ||
          domainNameString.includes(filterValue) ||
          providerNameString.includes(filterValue) ||
          registrationDateString.includes(filterValue) ||
          expiryDateString.includes(filterValue) ||
          registrationMobileNumberString.includes(filterValue) ||
          emailIdString.includes(filterValue)
        );
      });
    }
  }
  edit(id: string, val: string) {
    this.router.navigate(['/domain-register', id, val])
  }
  
// deletedomain(id:any) {
//   this.apiservice.deletedomain(id).subscribe(
//     (data: any) => {
//       console.log(data)
//       this.domainDetails = this.domainDetails.filter(domain => domain.domainId !== id);
//     },
//     error => {
//       console.error('Error deleting domain:', error);
//     }
//     );

// }

deletedomain(id: any) {
  this.deleteId = id;
  this.displayDeleteDialog = true; 
}

confirmDelete() {
  if (this.deleteId) {
    this.apiservice.deletedomain(this.deleteId).subscribe(
      (data: any) => {
        console.log(data);
        this.domainDetails = this.domainDetails.filter(domain => domain.domainId !== this.deleteId);
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
