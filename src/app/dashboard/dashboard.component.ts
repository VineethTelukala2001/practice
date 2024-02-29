import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  displayDialog: boolean = false;
  role: any;
  dashboardrole: boolean = false;
  adminrole: boolean = false;
  domainrole: boolean = false;
  hostingrole: boolean = false;
  hostdomainrole: boolean = false;
  emailrole: boolean = false;
  itreturnsrole: boolean = false;
  passwordsrole: boolean = false;
  dashboardData: any[] = [];
  


  constructor(
    public messageservice:MessageService,
    
    private apiservice:ApiService,
    private router:Router,

    ) { 
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
      else if(this.role == 'Hosting'){
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

    

    // ngOnInit(): void {
    //   this.apiservice.getdashboard().subscribe((data: any) => {
    //     this.dashboardData = data;
    //     console.log(data);
    //   });
    // }
    ngOnInit(): void {
      this.apiservice.getdashboard().subscribe(
        (data: any) => {
          if (typeof data === 'object') {
            // Convert object to array
            this.dashboardData = [data];
          } else if (Array.isArray(data)) {
            this.dashboardData = data;
          } else {
            console.error('Invalid data format:', data);
          }
        },
        (error) => {
          console.error('Error fetching dashboard data:', error);
        }
      );
    }
    
    
    


  showDialog() {
    this.displayDialog = true;
  }
  cancelLogout() {
    this.displayDialog = false;
  }
  logout() {
    this.displayDialog = false;
    this.router.navigate(['/login'])
  }
  

  isActive(route: string): boolean {
    return this.router.isActive(route, true);
  }
  
}
