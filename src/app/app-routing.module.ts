// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "./auth.guard";
import {RegisterComponent} from "./register/register.component";

export const routes: Routes = [
  { path: '', canActivate:[AuthGuard], component: HomeComponent},
  { path: 'home', canActivate:[AuthGuard], component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
