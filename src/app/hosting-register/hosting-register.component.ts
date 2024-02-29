import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-hosting-register',
  templateUrl: './hosting-register.component.html',
  styleUrls: ['./hosting-register.component.css']
})
export class HostingRegisterComponent  implements OnInit {

  role: any;
  dashboardrole: boolean = false;
  adminrole: boolean = false;
  domainrole: boolean = false;
  hostingrole: boolean = false;
  hostdomainrole: boolean = false;
  emailrole: boolean = false;
  itreturnsrole: boolean = false;
  passwordsrole: boolean = false;


  myForm!: FormGroup;
  displayDialog: boolean = false;
  submitted = false
  showPassword = false; 
  isEdit: boolean= false
  id: any;
  hostings: any[] = [];
  val: any;
  view: boolean = false;

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
          apiservice.edithosting(data.id).subscribe((data: any) => {
            this.hostings = data
            this.myForm.patchValue(data)
            console.log(data)
            
          });
        }
      });
    }

  ngOnInit(){
    this.myForm = new FormGroup({
      hostingProvider : new FormControl('', [Validators.required]),
      url1: new FormControl('', [Validators.required]),
      url2: new FormControl('', [Validators.required]),
      url3: new FormControl('', [Validators.required]),
      duration: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      // emailId: new FormControl('', [Validators.required]),
      emailId: new FormControl('', [Validators.required, Validators.email]),
      registrationPhoneNumber: new FormControl('', [Validators.required]),
      registrationDomain: new FormControl('', [Validators.required]),
      registrationDate: new FormControl('', [Validators.required]),
      expiryDate: new FormControl('', [Validators.required]),
      // hostingCpannelUrl: new FormControl('', [Validators.required]), 
      userName : new FormControl('', [Validators.required]), 
      hostingDnsName: new FormControl('', [Validators.required]),
      ns1: new FormControl('', [Validators.required]),
      ns2: new FormControl('', [Validators.required]),
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
    this.displayDialog = false;
    this.router.navigate(['/login'])
  }
  isActive(route: string): boolean {
    return this.router.isActive(route, true);
  }

  submit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.myForm.invalid) {
      return this.messageservice.add({ severity: 'error', summary: 'Error Message', detail: 'Please Fill Mandatory Fields' });
    }
    else{

      const obj :any = {
        "hostingProvider": this.myForm.controls['hostingProvider'].value,
        "url1": this.myForm.controls['url1'].value, 
        "url2": this.myForm.controls['url2'].value,
        "url3": this.myForm.controls['url3'].value,
        "duration": this.myForm.controls['duration'].value,
        "password": this.myForm.controls['password'].value,
        "emailId": this.myForm.controls['emailId'].value,
        "registrationPhoneNumber": this.myForm.controls['registrationPhoneNumber'].value,
        "registrationDomain": this.myForm.controls['registrationDomain'].value,
        "registrationDate": this.myForm.controls['registrationDate'].value,
        "expiryDate": this.myForm.controls['expiryDate'].value,
        "userName": this.myForm.controls['userName'].value,
        "hostingDnsName": this.myForm.controls['hostingDnsName'].value,
        "ns1": this.myForm.controls['ns1'].value,
        "ns2": this.myForm.controls['ns2'].value,
        
        
      };

      if (this.isEdit) {
        obj.hostingId = this.id;
        this.apiservice.updatehosting(obj.hostingId, obj).subscribe((data: any) => {
          this.messageservice.add({ severity: 'success', summary: 'Success Message', detail: 'Hosting updated successfully' });
          setTimeout(() => {
            this.router.navigate(['/hosting-view']);
          }, 1000);
        });
      } else {
        this.apiservice.addhosting(obj).subscribe((data: any) => {
          this.messageservice.add({ severity: 'success', summary: 'Success Message', detail: 'Hosting registration successfully' });
          setTimeout(() => {
            this.router.navigate(['/hosting-view']);
          }, 1000);
        }, (error: any) => {
          this.messageservice.add({ severity: 'error', summary: 'Error Message', detail: error.error.message });
        });
      }
    }
  }

      
}



