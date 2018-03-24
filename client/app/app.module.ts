import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';  // replaces previous Http service

//graph component
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';

import { FilterPipe } from './pipes/filter.pipe'

import { AppComponent } from './app.component';
import { ProfileTrackerComponent } from './components/profile-tracker/profile-tracker.component';
import { DashboardComponent } from './components/profile-tracker/dashboard/dashboard.component';
import { ContentAnalyserComponent } from './components/content-analyser/content-analyser.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ArtistFormComponent } from './components/profile-tracker/artist-form/artist-form.component';
import { SpotFormComponent } from './components/profile-tracker/spot-form/spot-form.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { EqualValidator } from './shared/directives/equal-validator.directive';  // import validator
import { EmailValidator } from './shared/directives/emailValidator.directive';
import { TopPostsComponent } from './components/content-analyser/top-posts/top-posts.component';
import { ContentDashboardComponent } from './components/content-analyser/content-dashboard/content-dashboard.component';
import { ContentGraphComponent } from './components/content-analyser/content-graph/content-graph.component';
import { TrackerGraphComponent } from './components/profile-tracker/tracker-graph/tracker-graph.component'

@NgModule({
  declarations: [
    AppComponent,
    ProfileTrackerComponent,
    DashboardComponent,
    ContentAnalyserComponent,
    LoginComponent,
    NavbarComponent,
    ArtistFormComponent,
    SpotFormComponent,
    RegisterComponent,
    EqualValidator,
    EmailValidator,
    FilterPipe,
    TopPostsComponent,
    ContentDashboardComponent,
    ContentGraphComponent,
    TrackerGraphComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ChartsModule 
  ],
  providers: [
  ],
   bootstrap: [AppComponent]
})
export class AppModule { }
