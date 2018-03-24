import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileTrackerComponent } from './components/profile-tracker/profile-tracker.component';
import { ContentAnalyserComponent } from './components/content-analyser/content-analyser.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
 
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile-tracker', component: ProfileTrackerComponent },
  { path: 'content-analyser', component: ContentAnalyserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
