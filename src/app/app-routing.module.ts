import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { ForgetPassComponent } from './forget-pass/forget-pass.component';
import { ResetPassComponent } from './reset-pass/reset-pass.component';
import { VerifEmailComponent } from './verif-email/verif-email.component';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { UsersAdminComponent } from './users-admin/users-admin.component';
import { AdminInvestComponent } from './admin-invest/admin-invest.component';
import { AdminSendMessageComponent } from './admin-send-message/admin-send-message.component';
import { NotificationComponent } from './notification/notification.component';
import { ProfileUserComponent } from './profile-user/profile-user.component';
import { UserTemplateComponent } from './user-template/user-template.component';
import { TransfertMarcheComponent } from './transfert-marche/transfert-marche.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { EditUserProfileComponent } from './edit-user-profile/edit-user-profile.component';
import { ContactAdminsComponent } from './contact-admins/contact-admins.component';


const routes: Routes = [
  {path:"",redirectTo:"/sign_in" , pathMatch:'full'  },
  {path:'sign_in', component:SignInComponent},
  {path:'sign_in/forget_pass',component:ForgetPassComponent},
  {path:'reset_pass/:email',component:ResetPassComponent},
  {path:'verif_email/:email',component:VerifEmailComponent},
  {path:'admin/:id',component:AdminTemplateComponent},
  {path:'admin/:id/profile',component:AdminProfileComponent},
  {path:'admin/:id/profile/edit',component:EditProfileComponent},
  {path:'user/:id',component:ProfileUserComponent},
  {path:'admin/:id/users',component:UsersAdminComponent},
  {path:'admin/:id/invest',component:AdminInvestComponent},
  {path:'admin/:id/sendmessage',component:AdminSendMessageComponent},
  {path:'admin/:id/notif',component:NotificationComponent},
  {path:'user/:id/dashboard',component:UserTemplateComponent},
  {path:'user/marche/:id',component:TransfertMarcheComponent},
  {path:'user/profile/:id',component:UserProfileComponent},
  {path:'user/profile/:id/edit',component:EditUserProfileComponent},
  {path:'user/contact/:id',component:ContactAdminsComponent}


  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule { }
