import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './Components/registration/registration.component';
import { LoginComponent } from './Components/login/login.component';
import { ForgotComponent } from './Components/forgot/forgot.component';
import { ResetComponent } from './Components/reset/reset.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { NoteComponent } from './Components/note/note.component';
import { DisplaynotesComponent } from './Components/displaynotes/displaynotes.component';
import { GetallComponent } from './Components/getall/getall.component';
import { AuthGuard } from './shared/auth.guard';
import { ArchiveComponent } from './Components/archive/archive.component';

const routes: Routes = [
  { path: 'register', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot', component: ForgotComponent },
  { path: 'reset', component: ResetComponent },
  { path: 'reset:\token', component: ResetComponent },
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: '/dashboard/notes', pathMatch: 'full' },
      { path: 'notes', component: GetallComponent },
      { path: 'archive', component: ArchiveComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
