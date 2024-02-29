import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isPasswordVisible = false;
  loginform!:FormGroup
  showPassword: boolean = false;

  submitted = false
  disable :boolean=false
  enable:boolean=true
  constructor(
    private route:Router,
    private messageservice:MessageService,
    private apiservice:ApiService,
  ) { }

  ngOnInit(): void {
    this.loginform = new FormGroup({
      emailId :new FormControl("",[Validators.required,]),
     otp:new FormControl("",Validators.required,),
     password:new FormControl("",[Validators.required,Validators.minLength(6)])
    })
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  otp(){
    this.submitted = true;

    if (!this.loginform.controls['emailId'].value) {
      this.messageservice.add({ severity: 'error', summary: 'Error Message', detail: 'Please Fill Valid Username & Password ' });
      return;
    }

    if (!this.loginform.controls['password'].value) {
      this.messageservice.add({ severity: 'error', summary: 'Error Message', detail: 'Please Fill Password Field' });
      return;
    }
    const obj:any={
      "emailId" :this.loginform.controls['emailId'].value,
      "password":this.loginform.controls['password'].value
    };

    this.apiservice.sendotp(obj).subscribe(
      (data: any) => {
        this.messageservice.add({ severity: 'success', summary: 'Success Message', detail: 'OTP Sent Successfully' });
        this.disable = true;
        this.enable = false; // Hide the initial fields when OTP sending is enabled
        console.log(data)
      },
      (err: any) => {
        if (err.error.message === 'Invalid Username') {
          this.messageservice.add({ severity: 'error', summary: 'Error Message', detail: 'Invalid credential' });
        } else if (err.error.message === 'Invalid Password') {
          this.messageservice.add({ severity: 'error', summary: 'Error Message', detail: 'Invalid password' });
        } else {
          this.messageservice.add({ severity: 'error', summary: 'Error Message', detail: 'Please fill all mandatory fields' });
        }
        this.disable = false;
      }
    );
  }

  login(){
    this.submitted = true;
    
  //   if (!this.loginform.controls['otp'].value) {
  //   return this.messageservice.add({ severity: 'error', summary: 'Error Message', detail: 'Please Fill Mandatory Fields' });
  // }
  
  if (!this.loginform.controls['emailId'].value || !this.loginform.controls['password'].value) {
    this.messageservice.add({ severity: 'error', summary: 'Error Message', detail: 'Please fill all mandatory fields' });
    return; // Prevent further execution if mandatory fields are not filled
  }
  

    const obj: any={
      "otp" :this.loginform.controls['otp'].value
    

    };
    this.apiservice.postlogin(obj).subscribe(
      (data: any) => {
        console.log(data.role);
        
        sessionStorage.setItem('role',data.role);

        this.messageservice.add({ severity: 'success', summary: 'Success Message', detail: 'OTP Verified Successfully' });
        this.route.navigate(['/dashboard']);
        console.log(data);
      },
      (err: any) => {
        this.messageservice.add({ severity: 'error', summary: 'Error Message', detail: 'Invalid OTP' });
      }
    );
    
  }
}    












