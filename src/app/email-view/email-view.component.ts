import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-email-view',
  templateUrl: './email-view.component.html',
  styleUrls: ['./email-view.component.css']
})
export class EmailViewComponent {
  role: any;
  dashboardrole: boolean = false;
  adminrole: boolean = false;
  domainrole: boolean = false;
  hostingrole: boolean = false;
  hostdomainrole: boolean = false;
  emailrole: boolean = false;
  itreturnsrole: boolean = false;
  passwordsrole: boolean = false;

  searchText: any
  items: MenuItem[] | undefined;
  totalCount = 0
  page = 1;
  pageSize = 10;
  displayDialog: boolean = false;
  emailDetails: any[] = [];
  isEdit: boolean= false
  allemailDetails: any;

  displayLogoutDialog: boolean = false;
  displayDeleteDialog: boolean = false;
  deleteId: any;



  constructor(
    private router:Router,
    private apiservice:ApiService,
  ) { 
    this.viewemail()
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

    this.apiservice.viewemail().subscribe((data: any) => {
      this.emailDetails = data;
      this.allemailDetails = data;
      console.log(data);
    });
  }
  pageChange(event: number) {
    this.page = event;
     this.viewemail()
   }
   viewemail() {
    this.apiservice.viewemail().subscribe((data: any) => {
      this.emailDetails = data
      this.allemailDetails = data
      this.totalCount = this.emailDetails.length
    })

  }
  adduser() {
    this.router.navigate(['/email-register'])
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
      this.emailDetails = this.allemailDetails; // Reset to the original list if the filter is empty
    } else {
      this.emailDetails = this.allemailDetails.filter((email: any) => {
        const emailIdString = email.emailId.toString().toLowerCase();
        const emailString = email.email.toLowerCase();
        const usernameString = email.username.toLowerCase();
        const domainNameString = email.domainName.toLowerCase();
        const passwordString = email.password.toString().toLowerCase();
  
        return (
          emailIdString.includes(filterValue) ||
          emailString.includes(filterValue) ||
          usernameString.includes(filterValue) ||
          domainNameString.includes(filterValue) ||
          passwordString.includes(filterValue)
        );
      });
    }
  }
  edit(id: string, val: string) {
    this.router.navigate(['/email-register', id, val])
  }

  
  

  

  // deleteemail(id:any) {
  //   this.apiservice.deleteemail(id).subscribe(
  //     (data: any) => {
  //       console.log(data)
        
  //       // this.getinvoice()
  //       this.emailDetails = this.emailDetails.filter(email => email.emailId !== id);
  //     },
  //     error => {
  //       console.error('Error deleting email:', error);
  //     }
  //     );
  
  // }

  deleteemail(id: any) {
    this.deleteId = id;
    this.displayDeleteDialog = true; 
  }
  
  confirmDelete() {
    if (this.deleteId) {
      this.apiservice.deleteemail(this.deleteId).subscribe(
        (data: any) => {
          console.log(data);
          this.emailDetails = this.emailDetails.filter(email => email.emailId !== this.deleteId);
        },
        error => {
          console.error('Error deleting email:', error);
        }
      );
    }
    this.displayDeleteDialog = false;
  }
  
  cancelDelete() {
    this.displayDeleteDialog = false;
  }
 
 



}
