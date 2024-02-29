import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HeaderComponent } from './header/header.component';
import { AdminRegisterComponent } from './admin-register/admin-register.component';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { DomainRegisterComponent } from './domain-register/domain-register.component';
import { DomainViewComponent } from './domain-view/domain-view.component';
import { HostingRegisterComponent } from './hosting-register/hosting-register.component';
import { HostdomainmapRegisterComponent } from './hostdomainmap-register/hostdomainmap-register.component';
import { ItRegisterComponent } from './it-register/it-register.component';
import { ItViewComponent } from './it-view/it-view.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmailRegisterComponent } from './email-register/email-register.component';
import { EmailViewComponent } from './email-view/email-view.component';
import { HostingViewComponent } from './hosting-view/hosting-view.component';
import { HostdomainmapViewComponent } from './hostdomainmap-view/hostdomainmap-view.component';
import { PasswordsListComponent } from './passwords-list/passwords-list.component';
// import { RoleGuard } from './role.gaurd';


const routes: Routes = [
  {path:'',redirectTo:'login', pathMatch:'full'},
  {path:'login',component:LoginComponent },
  {path:'side',component:HeaderComponent },
  {path:'side',component:SidenavComponent },
  {path:'admin-register',component:AdminRegisterComponent },
  {path:'admin-register/:id/:val', component: AdminRegisterComponent },
  {path:'admin-view',component:AdminViewComponent },
  {path:'domain-register',component:DomainRegisterComponent },
  {path:'domain-register/:id/:val',component:DomainRegisterComponent },
  {path:'domain-view',component:DomainViewComponent },
  {path:'hosting-register',component:HostingRegisterComponent},
  {path:'hosting-register/:id/:val',component:HostingRegisterComponent},
  {path:'hosting-view',component:HostingViewComponent},
  {path:'hostdomainmap-register',component:HostdomainmapRegisterComponent},
  {path:'hostdomainmap-register/:id/:val',component:HostdomainmapRegisterComponent},
  {path:'hostdomainmap-view',component:HostdomainmapViewComponent},
  {path:'it-register',component:ItRegisterComponent},
  {path:'it-register/:id/:val',component:ItRegisterComponent},
  {path:'it-view',component:ItViewComponent},
  // {path:'dashboard',component:DashboardComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'email-register',component:EmailRegisterComponent},
  {path:'email-register/:id/:val',component:EmailRegisterComponent},
  {path:'email-view',component:EmailViewComponent},
  {path:'passwords-list',component:PasswordsListComponent},
  // { path: 'dashboard', component: DashboardComponent },
  // {
  //   path: 'dashboard',
  //   component: DashboardComponent,
  //   canActivate: [RoleGuard],
  //   data: { expectedRole: 'hosting' } // Define the expected role for this route
  // },
  // {
  //   path: 'admin',
  //   component: AdminRegisterComponent,
  //   canActivate: [RoleGuard],
  //   data: { expectedRole: 'admin' } // Define the expected role for this route
  // },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
