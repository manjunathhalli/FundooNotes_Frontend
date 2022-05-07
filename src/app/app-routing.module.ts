import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './Components/registration/registration.component';
import { LoginComponent } from './Components/login/login.component';
import { ForgotComponent } from './Components/forgot/forgot.component';
import { ResetComponent } from './Components/reset/reset.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { NoteComponent } from './Components/note/note.component';
const routes: Routes = [
  { path: 'register', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot', component: ForgotComponent },
  { path: 'reset', component: ResetComponent },
  { path: 'reset:token', component: ResetComponent },
  // {path:"dashboard",component:DashboardComponent},
  // {path:"notes",component:NoteComponent},
  {path: 'dashboard', component: DashboardComponent,
    children:[
      {path:'', redirectTo:'/dashboard/notes', pathMatch:'full' },
      {path: 'notes', component: NoteComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
