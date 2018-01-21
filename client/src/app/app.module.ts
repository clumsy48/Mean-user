import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { FlashMessagesModule } from 'angular2-flash-messages'

import { AppComponent } from './app.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule,Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';


import { ValidateService} from './services/validate.service';
import { AuthService} from './services/auth.service';

const appRoutes : Routes = [
    {path:'',component : HomeComponent},
    {path:'login',component : LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'dashboard',component:DashboardComponent,canActivate : [AuthGuard]},
    {path:'profile',component:ProfileComponent,canActivate : [AuthGuard]}
  ];


@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    DashboardComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent
  ],
  imports: [
    HttpModule,
    FormsModule,
    FlashMessagesModule.forRoot(),
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ValidateService,AuthService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
