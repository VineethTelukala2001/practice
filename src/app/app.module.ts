import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HeaderComponent } from './header/header.component';
import { AdminRegisterComponent } from './admin-register/admin-register.component';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { DomainRegisterComponent } from './domain-register/domain-register.component';
import { DomainViewComponent } from './domain-view/domain-view.component';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TableModule } from 'primeng/table';
import { SidebarModule } from 'primeng/sidebar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { KeyFilterModule } from 'primeng/keyfilter';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { HostingRegisterComponent } from './hosting-register/hosting-register.component';
import { HostingViewComponent } from './hosting-view/hosting-view.component';
import { HostdomainmapRegisterComponent } from './hostdomainmap-register/hostdomainmap-register.component';
import { HostdomainmapViewComponent } from './hostdomainmap-view/hostdomainmap-view.component';
import { HttpClientModule } from '@angular/common/http';
import { EmailRegisterComponent } from './email-register/email-register.component';
import { EmailViewComponent } from './email-view/email-view.component';
import { ItRegisterComponent } from './it-register/it-register.component';
import { ItViewComponent } from './it-view/it-view.component';
import { DialogModule } from 'primeng/dialog';
import { DashboardComponent } from './dashboard/dashboard.component'; // Import the DialogModule
import {NgxPaginationModule} from 'ngx-pagination';
import { PasswordsListComponent } from './passwords-list/passwords-list.component';
import { TooltipModule } from 'primeng/tooltip';
import { PasswordMaskPipe } from './passwords-list/password-mask.pipe';
// import { ConfirmDialogModule } from 'primeng/confirmdialog';
// import { PasswordMaskPipe } from './path-to-your-password-mask.pipe';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidenavComponent,
    HeaderComponent,
    AdminRegisterComponent,
    AdminViewComponent,
    DomainRegisterComponent,
    DomainViewComponent,
    HostingRegisterComponent,
    HostingViewComponent,
    HostdomainmapRegisterComponent,
    HostdomainmapViewComponent,
    EmailRegisterComponent,
    EmailViewComponent,
    ItRegisterComponent,
    ItViewComponent,
    DashboardComponent,
    PasswordsListComponent,
    // ConfirmDialogModule,
    PasswordMaskPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ToastModule,
    RippleModule,
    BreadcrumbModule,
    TableModule,
    SidebarModule,
    PanelMenuModule,
    KeyFilterModule,
    CardModule,
    ButtonModule,
    BrowserAnimationsModule,
    InputTextModule,
    HttpClientModule,
    DialogModule,
    NgxPaginationModule,
    TooltipModule,
     

  ],
  providers: [MessageService,ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
