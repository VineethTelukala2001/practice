import { Component, OnInit } from '@angular/core';
import { Admin } from './admin.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { MenuItem } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';


@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {

  adminForm:any;
  selectedMenuItem: string = '';

  
  items: MenuItem[] | undefined;
  getadmindata: any;
  admindetails: any[] = [];
  alladmindata: any;
  totalCount = 0
  page = 1;
  pageSize = 10;
  displayDialog: boolean = false;
  adminDetails: any[] = [];
  isEdit: boolean= false
  alladminDetails: any;
  searchText: any
  role: any;
  displayLogoutDialog: boolean = false;
  displayDeleteDialog: boolean = false;
  deleteId: any;

  
  constructor(
    private router:Router,
    private apiservice:ApiService,
    private confirmationService: ConfirmationService
    
  ) { 
    this.getAdmin()
  }

  ngOnInit(): void {
    // this.role=sessionStorage.getItem('role')

    // this.apiservice.getAdmin().subscribe((data: any) => {
    //   this.admins = data;
    //   this.alladmins = data;
    //   // console.log(data);
    // });

    
  }
  pageChange(event: number) {
    this.page = event;
     this.getAdmin()
   }
   getAdmin() {
      this.apiservice.getAdmin().subscribe((data: any) => {
      this.adminDetails = data
      this.alladminDetails = data
      this.totalCount = this.adminDetails.length
    })

  }
  adduser() {
    this.router.navigate(['/admin-register'])
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

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase();
  
    if (!filterValue) {
      this.adminDetails = this.alladminDetails;
    } else {
      this.adminDetails = this.alladminDetails.filter((admin: any) => {
        const adminIdString = admin.adminId.toString().toLowerCase();
        const adminNameString = admin.name.toLowerCase();
        const userNameString = admin.userName.toLowerCase();
        const phoneNoString = admin.phoneNo.toString().toLowerCase();
        const emailIdString = admin.emailId.toLowerCase();
        const roleString = admin.role.toLowerCase();
  
        return (
          adminIdString.includes(filterValue) ||
          adminNameString.includes(filterValue) ||
          userNameString.includes(filterValue) ||
          phoneNoString.includes(filterValue) ||
          emailIdString.includes(filterValue) ||
          roleString.includes(filterValue)
        );
      });
    }
  }
  
  edit(id: string, val: string) {
    this.router.navigate(['/admin-register', id, val])
  }
  
  

  deleteAdmin(id: any) {
    this.deleteId = id;
    this.displayDeleteDialog = true; 
  }

  confirmDelete() {
    if (this.deleteId) {
      this.apiservice.deleteAdmin(this.deleteId).subscribe(
        (data: any) => {
          console.log(data);
          this.adminDetails = this.adminDetails.filter(admin => admin.adminId !== this.deleteId);
        },
        error => {
          console.error('Error deleting admin:', error);
        }
      );
    }
    this.displayDeleteDialog = false;
  }

  cancelDelete() {
    this.displayDeleteDialog = false;
  }

  
  isActive(route: string): boolean {
    return this.router.isActive(route, true);
  }


}
