import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-hostdomainmap-register',
  templateUrl: './hostdomainmap-register.component.html',
  styleUrls: ['./hostdomainmap-register.component.css']
})
export class HostdomainmapRegisterComponent implements OnInit {
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
  submitted = false;
  showPassword = false; 
  isEdit: boolean= false;
  domaindetails:any
  alldomaindetails:any
  totalCount: number | undefined;
  selectedOption: any;
  domains: any[] = [];
  hostings: any[] = [];
  domainDetails: any;
  alldomains: any;
  allhostings: any;
  id: any;
  val: any;
  view: boolean = false;
  showDomainPassword = false;
  showHostPassword = false;

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
        apiservice.edithostdomainmap(data.id).subscribe((data: any) => {
          this.domains = data
          this.myForm.patchValue(data)
          console.log(data)
        });
      }
    });
  }


  ngOnInit() {
    this.myForm = new FormGroup({
      domainName : new FormControl('', [Validators.required]),
      hostProvider : new FormControl('', [Validators.required]),
      payment : new FormControl('', [Validators.required]),
      domainProvider: new FormControl('', [Validators.required]),
      password : new FormControl('', [Validators.required]),
      userName : new FormControl('', [Validators.required]),
      hostUserName : new FormControl('', [Validators.required]),
      hostPassword : new FormControl('', [Validators.required]),
      url1 : new FormControl('', [Validators.required]),
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
      
    })
    this.apiservice.viewhosting().subscribe((data:any)=>{
      this.hostings = data
      this.allhostings = data
      console.log(this.hostings)
      
    })
    this.apiservice.getallproviders().subscribe((data:any)=>{
      this.domains = data
      this.alldomains = data
      console.log(this.domains)
      
    })

  }
  onDomainNameSelected() {
    const selectedValue = this.myForm.get('domainName')?.value;
    const selectedDomain = this.domains.find((domain) => domain.domainUrl === selectedValue);

    if (selectedDomain) {
      this.myForm.patchValue({
        userName: selectedDomain.userName || '', // Ensure the default value is set if not present
        password: selectedDomain.password || '',
        // Add more fields as needed
      
      });
      console.log(this.domains)
    } else {
      // Reset the form or handle the case when the selected domain is not found
      this.myForm.patchValue({
        userName: '',
        password: '',
      
        // Add more fields as needed
      });
    }
   
  }
  toggleDomainPasswordVisibility() {
    this.showDomainPassword = !this.showDomainPassword;
  }

  toggleHostPasswordVisibility() {
    this.showHostPassword = !this.showHostPassword;
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
  
  submitForm(){
    this.submitted = true;
    // stop here if form is invalid
    if (this.myForm.invalid) {
      return this.messageservice.add({ severity: 'error', summary: 'Error Message', detail: 'Please Fill Mandatory Fields' });
    }
    else{

    const obj :any = {
      "domainName": this.myForm.controls['domainName'].value,
      "hostProvider": this.myForm.controls['hostProvider'].value, 
      "payment": this.myForm.controls['payment'].value,
      "domainProvider": this.myForm.controls['domainProvider'].value,
      "password": this.myForm.controls['password'].value,
      "userName": this.myForm.controls['userName'].value,
      "hostUserName": this.myForm.controls['hostUserName'].value,
      "hostPassword": this.myForm.controls['hostPassword'].value,
      "url1": this.myForm.controls['url1'].value,
    };

    if (this.isEdit) {
      obj.hostDomainId = this.id;
      this.apiservice.updatehostdomainmap(obj.hostDomainId, obj).subscribe((data: any) => {
        this.messageservice.add({ severity: 'success', summary: 'Success Message', detail: 'Hostdomain map updated successfully' });
        setTimeout(() => {
          this.router.navigate(['/hostdomainmap-view']);
        }, 1000);
      });
    } else {
      this.apiservice.addhostdomainmap(obj).subscribe((data: any) => {
        this.messageservice.add({ severity: 'success', summary: 'Success Message', detail: 'Hostdomain map registration successfully' });
        setTimeout(() => {
          this.router.navigate(['/hostdomainmap-view']);
        }, 1000);
      }, (error: any) => {
        this.messageservice.add({ severity: 'error', summary: 'Error Message', detail: error.error.message });
      });
    }
  }
}
  }
