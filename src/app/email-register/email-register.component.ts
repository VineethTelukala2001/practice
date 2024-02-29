import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-email-register',
  templateUrl: './email-register.component.html',
  styleUrls: ['./email-register.component.css']
})
export class EmailRegisterComponent implements OnInit {

  role: any;
  dashboardrole: boolean = false;
  adminrole: boolean = false;
  domainrole: boolean = false;
  hostingrole: boolean = false;
  hostdomainrole: boolean = false;
  emailrole: boolean = false;
  itreturnsrole: boolean = false;
  passwordsrole: boolean = false;
  domains: any[] = [];

  termsValue: boolean= false
  error: any;
  myForm!: FormGroup;
  showPassword = false;
  displayDialog: boolean = false;
  value!: string;
  submitted = false
  message!: string;
  items: MenuItem[] | undefined;
  isEdit: boolean= false
  // getcustomerdata: any;
  id: any;
  val: any;
  admindetails:any
  emails: any[] = [];
  view: boolean = false;
  alldomains: any;
  constructor(
    public messageservice:MessageService,
    private http: HttpClient,
    private apiservice:ApiService,
    private router:Router,
    private activatedroute:ActivatedRoute,


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


      this.activatedroute.params.subscribe((data: any) => {
        if (data.id) {
          this.isEdit = true;
          this.id = data.id;
          this.val = data.val;
          console.log(this.id)
          apiservice.editemail(data.id).subscribe((data: any) => {
            this.emails = data
            this.myForm.patchValue(data)
            console.log(data)
          });
        }
      });
    }

  ngOnInit() {
    // this.items = [{ label: 'Dashboard', routerLink:'/dashboard' }, { label: 'Product view', routerLink:'/product-grid' }];
    this.myForm = new FormGroup({
      username: new FormControl("",Validators.required),
      // email: new FormControl("",Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password:new FormControl("",Validators.required),
      domainName:new FormControl("",Validators.required),
    });
    if(this.val == 'view'){
      this.view = true
      
      this.myForm.disable()
       
    }
    else{
   
    }
    this.apiservice.viewdomain().subscribe((data:any)=>{
      this.domains = data
      this.alldomains = data
      console.log(this.domains)
      // this.totalCount = this.domaindetails.length
    })
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
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
  

  onsubmit(){
  this.submitted = true;

  if(this.myForm.invalid){
    return this.messageservice.add({ severity: 'error', summary: 'Error Message', detail: 'Please Fill Mandatory Fields' });
  }
  else{

  const obj :any = {
    "username":this.myForm.controls['username'].value,
    "email":this.myForm.controls['email'].value,
    "password":this.myForm.controls['password'].value,
    "domainName":this.myForm.controls['domainName'].value,
  }

  if (this.isEdit) {
        obj.emailId = this.id;
        this.apiservice.updateemail(obj.emailId, obj).subscribe((data: any) => {
          this.messageservice.add({ severity: 'success', summary: 'Success Message', detail: 'Email updated successfully' });
          setTimeout(() => {
            this.router.navigate(['/email-view']);
          }, 1000);
        });
      } else {
        this.apiservice.addemail(obj).subscribe((data: any) => {
          this.messageservice.add({ severity: 'success', summary: 'Success Message', detail: 'Email registration successfully' });
          setTimeout(() => {
            this.router.navigate(['/email-view']);
          }, 1000);
        }, (error: any) => {
          this.messageservice.add({ severity: 'error', summary: 'Error Message', detail: error.error.message });
        });
      }
    }
  }
}
