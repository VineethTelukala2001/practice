import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-hostdomainmap-view',
  templateUrl: './hostdomainmap-view.component.html',
  styleUrls: ['./hostdomainmap-view.component.css']
})
export class HostdomainmapViewComponent implements OnInit {

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
  hostdomainDetails: any[] = [];
  searchText: any
  allhostdomainDetails: any;
  totalCount = 0
  page = 1;
  pageSize = 10;
  deleteId: any;
  displayLogoutDialog: boolean = false;
  displayDeleteDialog: boolean = false;




  constructor(
    private router:Router,
    private apiservice:ApiService,
  ) {
    this.viewhostdomainmap()
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

    // this.apiservice.viewhostdomainmap().subscribe((data: any) => {
    //   this.hostdomains = data;
    //   this.allhostdomains = data;
    //   console.log(data);
    // });
     
  }
  pageChange(event: number) {
    this.page = event;
     this.viewhostdomainmap()
   }
   viewhostdomainmap() {
    this.apiservice.viewhostdomainmap().subscribe((data: any) => {
      this.hostdomainDetails = data
      this.allhostdomainDetails = data
      this.totalCount = this.hostdomainDetails.length
    })

  }
  adduser() {
    this.router.navigate(['/hostdomainmap-register'])
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
      this.hostdomainDetails = this.allhostdomainDetails; // Reset to the original list if the filter is empty
    } else {
      this.hostdomainDetails = this.allhostdomainDetails.filter((hostdomain: any) => {
        const hostDomainIdString = hostdomain.hostDomainId.toString().toLowerCase();
        const domainNameString = hostdomain.domainName.toLowerCase();
        const hostProviderString = hostdomain.hostProvider.toLowerCase();
        const domainProviderString = hostdomain.domainProvider.toString().toLowerCase();
        // const expiryDateString = hostdomain.expiryDate.toLowerCase();
        const paymentString = hostdomain.payment.toLowerCase();
        // const daysLeftString = hostdomain.daysLeft.toString().toLowerCase();
        // const durationString = hostdomain.duration.toLowerCase();
  
        return (
          hostDomainIdString.includes(filterValue) ||
          domainNameString.includes(filterValue) ||
          hostProviderString.includes(filterValue) ||
          domainProviderString.includes(filterValue) ||
          // expiryDateString.includes(filterValue) ||
          paymentString.includes(filterValue)
          // daysLeftString.includes(filterValue)
          // durationString.includes(filterValue)
        );
      });
    }
  }
  edit(id: string, val: string) {
    this.router.navigate(['/hostdomainmap-register', id, val])
  }


deletehostdomainmap(id: any) {
  this.deleteId = id;
  this.displayDeleteDialog = true; 
}

confirmDelete() {
  if (this.deleteId) {
    this.apiservice.deletehostdomainmap(this.deleteId).subscribe(
      (data: any) => {
        console.log(data);
        this.hostdomainDetails = this.hostdomainDetails.filter(hostdomain => hostdomain.hostDomainId !== this.deleteId);
      },
      error => {
        console.error('Error deleting hostdomain:', error);
      }
    );
  }
  this.displayDeleteDialog = false;
}

cancelDelete() {
  this.displayDeleteDialog = false;
}


}



