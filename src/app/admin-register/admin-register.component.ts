import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css']
})
export class AdminRegisterComponent  implements OnInit {
  
  // termsValue: boolean= false
  // error: any;
  myForm!: FormGroup;
  showPassword = false;
  displayDialog: boolean = false;
  value!: string;
  submitted = false
  // message!: string;
  // items: MenuItem[] | undefined;
  isEdit: boolean= false
  admins: any[] = [];
  view: boolean = false;
  id: any;
  val: any;
  admindetails:any;
  // capitalizeFirstLetter(value: string): string {
  //   return value.charAt(0).toUpperCase() + value.slice(1);
  // }
  
  constructor(
    public messageservice:MessageService,
    private http: HttpClient,
    private apiservice:ApiService,
    private router:Router,
    private activatedroute:ActivatedRoute,


    ) {
      this.activatedroute.params.subscribe((data: any) => {
        if (data.id) {
          this.isEdit = true;
          this.id = data.id;
          this.val = data.val;
          console.log(this.id)
          this.apiservice.editadmin(data.id).subscribe((data: any) => {
            this.admins = data
            console.log(data)
            this.myForm.patchValue(data)
            
          });
         
        }
      });
    }

  ngOnInit() {
    // this.items = [{ label: 'Dashboard', routerLink:'/dashboard' }, { label: 'Product view', routerLink:'/product-grid' }];
    this.myForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      userName: new FormControl("",Validators.required),
      emailId: new FormControl('', [Validators.required, Validators.email]),
      // emailId: new FormControl("",Validators.required),
      // emailId: new FormControl("", [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+(\.[^\s@]+)?$/)]),

      password:new FormControl("",Validators.required),
      // password: new FormControl('', [
      //   Validators.required,
      
      //   Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
  
      // ]),
      phoneNo:new FormControl('',Validators.required),
      role:new FormControl('',Validators.required)
    })
    if(this.val == 'view'){
      this.view = true
      
      this.myForm.disable()
       
    }
    else{
   
    }
  }
  preventPaste(event: ClipboardEvent): void {
    event.preventDefault();
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

  
  onsubmit(){
  this.submitted = true;

  if(this.myForm.invalid) {
    return this.messageservice.add({ severity: 'error', summary: 'Error Message', detail: 'Please Fill Mandatory Fields' });
  }
  else{
  const obj :any = {
    "name":this.myForm.controls['name'].value,
    "userName":this.myForm.controls['userName'].value,
    // "userName": this.capitalizeFirstLetter(this.myForm.controls['userName'].value),
    "emailId":this.myForm.controls['emailId'].value,
    "password":this.myForm.controls['password'].value,
    "phoneNo":this.myForm.controls['phoneNo'].value,
    "role":this.myForm.controls['role'].value
  };

  if (this.isEdit) {
    obj.adminId = this.id;
    this.apiservice.updateAdmin(obj.adminId, obj).subscribe((data: any) => {
      this.messageservice.add({ severity: 'success', summary: 'Success Message', detail: 'Admin updated successfully' });
      // console.log(data)
      setTimeout(() => {
        this.router.navigate(['/admin-view']);
      }, 1000);
    });
  } else {
    this.apiservice.postAdmin(obj).subscribe((data: any) => {
      this.messageservice.add({ severity: 'success', summary: 'Success Message', detail: 'Admin registration successfully' });
      console.log(data)
      setTimeout(() => {
        this.router.navigate(['/admin-view']);
      }, 1000);
    }, (error: any) => {
      this.messageservice.add({ severity: 'error', summary: 'Error Message', detail: error.error.message });
    });
  }
}
}
isActive(route: string): boolean {
  return this.router.isActive(route, true);
}
}


