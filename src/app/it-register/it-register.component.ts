import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { MenuItem, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-it-register',
  templateUrl: './it-register.component.html',
  styleUrls: ['./it-register.component.css']
})
export class ItRegisterComponent  implements OnInit {

  role: any;
  dashboardrole: boolean = false;
  adminrole: boolean = false;
  domainrole: boolean = false;
  hostingrole: boolean = false;
  hostdomainrole: boolean = false;
  emailrole: boolean = false;
  itreturnsrole: boolean = false;
  passwordsrole: boolean = false;

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
  returns: any[] = [];
  // getcustomerdata: any;
  id: any;
  val: any;
  view: boolean = false;
  admindetails:any
  constructor(
    public messageservice:MessageService,
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
          apiservice.edititreturns(data.id).subscribe((data: any) => {
            this.returns = data
            this.myForm.patchValue(data)
            console.log(data)
            
          });
        }
      });}
      get emailFormControl() {
        return this.myForm.get('emailId')!;
      }

  ngOnInit() {
    // this.items = [{ label: 'Dashboard', routerLink:'/dashboard' }, { label: 'Product view', routerLink:'/product-grid' }];
    this.myForm = new FormGroup({
      serviceType: new FormControl("", [Validators.required]),
      // emailId: new FormControl("",Validators.required),
      emailId: new FormControl("", [Validators.required, Validators.email]), // Add Validators.email here
      registeredMobileNo: new FormControl("",Validators.required),
      registrationDate:new FormControl("",Validators.required),
      loginUrl:new FormControl('',Validators.required),
      userName:new FormControl('',Validators.required),
      password:new FormControl('',Validators.required),
      createdBy:new FormControl('',Validators.required),
      expiryDate:new FormControl('',Validators.required)
    });
    if(this.val == 'view'){
      this.view = true
      
      this.myForm.disable()
       
    }
    else{
   
    }
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
    // alert('Logging out...');
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
    "serviceType":this.myForm.controls['serviceType'].value,
    "emailId":this.myForm.controls['emailId'].value,
    "registeredMobileNo":this.myForm.controls['registeredMobileNo'].value,
    "registrationDate":this.myForm.controls['registrationDate'].value,
    "loginUrl":this.myForm.controls['loginUrl'].value,
    "userName":this.myForm.controls['userName'].value,
    "password":this.myForm.controls['password'].value,
    "createdBy":this.myForm.controls['createdBy'].value,
    "expiryDate":this.myForm.controls['expiryDate'].value,
  };

  if (this.isEdit) {
    obj.customerId = this.id;
    this.apiservice.updateitreturns(obj.customerId, obj).subscribe((data: any) => {
      this.messageservice.add({ severity: 'success', summary: 'Success Message', detail: 'IT Returns updated successfully' });
      console.log(data)
      setTimeout(() => {
        this.router.navigate(['/it-view']);
      }, 1000);
    });
  } else {
    this.apiservice.additreturns(obj).subscribe((data: any) => {
      this.messageservice.add({ severity: 'success', summary: 'Success Message', detail: 'IT Returns registration successfully' });
      console.log(data)
      setTimeout(() => {
        this.router.navigate(['/it-view']);
      }, 1000);
    }, (error: any) => {
      this.messageservice.add({ severity: 'error', summary: 'Error Message', detail: error.error.message });
    });
  }
}
}
}
