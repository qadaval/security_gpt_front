import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {RouterLinkWithHref, RouterOutlet} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import { HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RouterTestingModule} from "@angular/router/testing";
import {AppRoutingModule} from "./app-routing.module";
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";
import {RegisterComponent} from "./register/register.component";

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AppComponent,
    HeaderComponent,
    FooterComponent,

  ],
  imports: [
    BrowserModule,
    RouterOutlet,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterLinkWithHref,
    RouterTestingModule,
    AppRoutingModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  providers: [],
  exports: [
    FooterComponent,
    HeaderComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
