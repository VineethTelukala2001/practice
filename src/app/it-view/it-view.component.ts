import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-it-view',
  templateUrl: './it-view.component.html',
  styleUrls: ['./it-view.component.css']
})
export class ItViewComponent implements OnInit {

  role: any;
  dashboardrole: boolean = false;
  adminrole: boolean = false;
  domainrole: boolean = false;
  hostingrole: boolean = false;
  hostdomainrole: boolean = false;
  emailrole: boolean = false;
  itreturnsrole: boolean = false;
  passwordsrole: boolean = false;

  adminForm:any
  searchText: any
  items: MenuItem[] | undefined;
  
  
  
  totalCount = 0
  page = 1;
  pageSize = 10;
  displayDialog: boolean = false;
  isEdit: boolean= false
  returns: any[]=[];
  customerDetails: any[]=[];
  allcustomerDetails: any;
  deleteId: any;
  displayLogoutDialog: boolean = false;
  displayDeleteDialog: boolean = false;




  constructor(
    private router:Router,
    private apiservice:ApiService,
  ) { 
    this.viewitreturns()
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

    // this.apiservice.viewitreturns().subscribe((data: any) => {
    //   this.customerDetails = data;
    //   this.allcustomerDetails = data;
    //   console.log(data);
    // });
  }
  pageChange(event: number) {
    this.page = event;
     this.viewitreturns()
   }
   viewitreturns() {
    this.apiservice.viewitreturns().subscribe((data: any) => {
      this.customerDetails = data
      this.allcustomerDetails = data
      this.totalCount = this.customerDetails.length
    })

  }
  adduser() {
    this.router.navigate(['/it-register'])
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
    this.customerDetails = this.allcustomerDetails; // Reset to the original list if the filter is empty
  } else {
    this.customerDetails = this.allcustomerDetails.filter((customer: any) => {
      const customerIdString = customer.customerId.toString().toLowerCase();
      const emailIdString = customer.emailId.toLowerCase(); // Corrected property name
      const userNameString = customer.userName.toLowerCase();
      const registeredMobileNoString = customer.registeredMobileNo.toString().toLowerCase();
      const createdByString = customer.createdBy.toLowerCase(); // Corrected property name
      const daysLeftString = customer.daysLeft.toString().toLowerCase(); // Corrected property name

      return (
        customerIdString.includes(filterValue) ||
        emailIdString.includes(filterValue) ||
        userNameString.includes(filterValue) ||
        registeredMobileNoString.includes(filterValue) ||
        createdByString.includes(filterValue) ||
        daysLeftString.includes(filterValue)
      );
    });
  }
}


  edit(id: string, val: string) {
    this.router.navigate(['/it-register', id, val])
  }

// deleteitreturns(id:any) {
//   this.apiservice.deleteitreturns(id).subscribe(
//     (data: any) => {
//       console.log(data)
      
//       // this.getinvoice()
//       this.customerDetails = this.customerDetails.filter(customer =>  customer.customerId !== id);
//     }
//     // error => {
//     //   console.error('Error deleting domain:', error);
//     // }
//     );

//   }

deleteitreturns(id: any) {
  this.deleteId = id;
  this.displayDeleteDialog = true; 
}

confirmDelete() {
  if (this.deleteId) {
    this.apiservice.deleteitreturns(this.deleteId).subscribe(
      (data: any) => {
        console.log(data);
        this.customerDetails = this.customerDetails.filter(customer =>  customer.customerId !== this.deleteId);
      },
      error => {
        console.error('Error deleting customer:', error);
      }
    );
  }
  this.displayDeleteDialog = false;
}

cancelDelete() {
  this.displayDeleteDialog = false;
}
}

