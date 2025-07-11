import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { AuthenticationService } from "../service/auth.service";
import { Router } from '@angular/router';
import { User } from "../model/user";
import { CommonModule } from "@angular/common";
import { HttpErrorResponse } from '@angular/common/http';
import { LocationService } from '../service/location.service';
import { Oblast } from '../model/oblast';
import { District } from '../model/district';
import { AppModule } from "../app.module";
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  currentUser: User | null = null;

  public oblastAll: Oblast[] = [];
  public selectedOblast: Oblast | null = null;
  public selectedRegion: District | null = null;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private locationService: LocationService
  ) {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
      if (!user) this.router.navigate(['/login']);
    });
  }

  ngOnInit(): void {
    if (this.currentUser?.username) {
      this.getUserByUsername(this.currentUser.username);
    }
    this.getAllLocations();
  }

  logout() {
    this.authService.logout();
  }

  public getUserByUsername(username: string): void {
    this.authService.getUserByUsername(username).subscribe(
      (response: User) => {
        this.currentUser = response;
        console.log("User Current: ", this.currentUser);
      },
      (error: HttpErrorResponse) => console.log(error.message)
    );
  }

  public getAllLocations(): void {
    this.locationService.getAllLocations().subscribe(
      (response: Oblast[]) => this.oblastAll = response,
      (error: HttpErrorResponse) => console.log(error.message)
    );
  }

  // — методы для селектора
  openOblast(ob: Oblast): void {
    this.selectedOblast = ob;
    this.selectedRegion = null;
  }

  goBack(): void {
    this.selectedOblast = null;
  }

  selectRegion(reg: District): void {
    this.selectedRegion = reg;
    console.log('Выбран город:', reg);
    // здесь можно, например, навигировать или сохранять выбор
  }
}
