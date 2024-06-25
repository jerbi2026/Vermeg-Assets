import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { FormsModule } from '@angular/forms';
import { ForgetPassComponent } from './forget-pass/forget-pass.component';
import { ResetPassComponent } from './reset-pass/reset-pass.component';
import { VerifEmailComponent } from './verif-email/verif-email.component';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { TestAdminComponent } from './test-admin/test-admin.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxPaginationModule } from 'ngx-pagination';
import { UsersAdminComponent } from './users-admin/users-admin.component';
import { AdminInvestComponent } from './admin-invest/admin-invest.component';
import { AdminSendMessageComponent } from './admin-send-message/admin-send-message.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { NotificationComponent } from './notification/notification.component';
import { ProfileUserComponent } from './profile-user/profile-user.component';
import { UserSidebarComponent } from './user-sidebar/user-sidebar.component';
import { UserTemplateComponent } from './user-template/user-template.component';
import { MarcheComponent } from './marche/marche.component';
import { MarcheClientComponent } from './marche-client/marche-client.component';
import { TransfertMarcheComponent } from './transfert-marche/transfert-marche.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { EditUserProfileComponent } from './edit-user-profile/edit-user-profile.component';
import { ContactAdminsComponent } from './contact-admins/contact-admins.component';



@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    ForgetPassComponent,
    ResetPassComponent,
    VerifEmailComponent,
    AdminTemplateComponent,
    AdminSidebarComponent,
    AdminProfileComponent,
    EditProfileComponent,
    TestAdminComponent,
    UsersAdminComponent,
    AdminInvestComponent,
    AdminSendMessageComponent,
    AdminNavbarComponent,
    NotificationComponent,
    ProfileUserComponent,
    UserSidebarComponent,
    UserTemplateComponent,
    MarcheComponent,
    MarcheClientComponent,
    TransfertMarcheComponent,
    UserProfileComponent,
    EditUserProfileComponent,
    ContactAdminsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxChartsModule,
    NgxPaginationModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
