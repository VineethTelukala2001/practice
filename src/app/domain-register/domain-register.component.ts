import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators , FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-domain-register',
  templateUrl: './domain-register.component.html',
  styleUrls: ['./domain-register.component.css']
})
export class DomainRegisterComponent implements OnInit {

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
  isEdit: boolean= false;
  domains: any[] = [];
  id: any;
  val: any;
  view: boolean = false;

  constructor(
    public messageservice:MessageService,
    private http: HttpClient,
    private apiservice:ApiService,
    private router:Router,
    private activatedroute:ActivatedRoute,
    private formBuilder: FormBuilder
    
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
          apiservice.editdomain(data.id).subscribe((data: any) => {
            this.domains = data
            this.myForm.patchValue(data)
            console.log(data)
          });
        }
      });
    }

  ngOnInit(){
    this.myForm = new FormGroup({
      domainName : new FormControl('', [Validators.required]),
      providerName: new FormControl('', [Validators.required]),
      domainUrl: new FormControl('', [Validators.required]),
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      registrationDate: new FormControl('', [Validators.required]),
      expiryDate: new FormControl('', [Validators.required]),
      clientName: new FormControl('', [Validators.required]),
      duration: new FormControl('', [Validators.required]),
      registrationName: new FormControl('', [Validators.required]), 
      registrationMobileNumber : new FormControl('', [Validators.required]), 
      // emailId: new FormControl('', [Validators.required]),
      emailId: new FormControl('', [Validators.required, Validators.email]),
      // daysLeft: new FormControl('', [Validators.required]), 
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

  onsubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.myForm.invalid) {
      return this.messageservice.add({ severity: 'error', summary: 'Error Message', detail: 'Please Fill Mandatory Fields' });
    }
    else{
     
      const obj :any = {
        "domainName": this.myForm.controls['domainName'].value,
        "providerName": this.myForm.controls['providerName'].value, 
        "domainUrl": this.myForm.controls['domainUrl'].value,
        "userName": this.myForm.controls['userName'].value,
        "password": this.myForm.controls['password'].value,
        "registrationDate": this.myForm.controls['registrationDate'].value,
        "expiryDate": this.myForm.controls['expiryDate'].value,
        "clientName": this.myForm.controls['clientName'].value,
        "duration": this.myForm.controls['duration'].value,
        "registrationName": this.myForm.controls['registrationName'].value,
        "registrationMobileNumber": this.myForm.controls['registrationMobileNumber'].value,
        "emailId": this.myForm.controls['emailId'].value,
        // "daysLeft": this.myForm.controls['daysLeft'].value
        
      };

      // console.log(obj)
      if (this.isEdit) {
        obj.domainId = this.id;
        this.apiservice.updatedomain(obj.domainId, obj).subscribe((data: any) => {
          this.messageservice.add({ severity: 'success', summary: 'Success Message', detail: 'Domain Details Updated Successfully' });
          setTimeout(() => {
            this.router.navigate(['/domain-view']);
          }, 1000);
        });
      } else {
        this.apiservice.adddomain(obj).subscribe((data: any) => {
          this.messageservice.add({ severity: 'success', summary: 'Success Message', detail: 'Domain Added Successfully' });
          setTimeout(() => {
            this.router.navigate(['/domain-view']);
          }, 1000);
        }, (error: any) => {
          this.messageservice.add({ severity: 'error', summary: 'Error Message', detail: error.error.message });
        });
      }
    }

}}
