import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './Components/registration/registration.component';
import { LoginComponent } from './Components/login/login.component';
import { ForgotComponent } from './Components/forgot/forgot.component';
import { ResetComponent } from './Components/reset/reset.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';

const routes: Routes = [
{path:'register',component:RegistrationComponent},
{path:'login',component:LoginComponent},
{path:'forgot',component:ForgotComponent},
{path:'reset',component:ResetComponent},
{path:"reset/:token",component:ResetComponent},
{path:"dashboard",component:DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
