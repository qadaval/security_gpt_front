import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../service/auth.service";
import { Oblast } from '../model/oblast';
import { District } from '../model/district';
import { User } from '../model/user';
import { HttpErrorResponse } from '@angular/common/http';
import { LocationService } from '../service/location.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  //acts as a flag to check whether the user is logged in, and change the buttons accordingly
  isLoggedIn: boolean | undefined;
  isAdmin: boolean | undefined;
  userId: number | undefined;
  currentUser: User | null = null;
  location: Oblast | null = null
  district: District | null = null

  locations: Oblast[] = [];
  districts: District[] = [];
  selectedOblastId: number | null = null;
  selectedDistrictId: number | null = null;

  isChoosingOblast = true;
  
  constructor(private authService: AuthenticationService, private router: Router, private locationService: LocationService) {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
      // if (!user) this.router.navigate(['/login']);
    });
  }
  ngOnInit() {
    if(this.authService.currentUserValue){
      this.isLoggedIn = true;
      this.userId = this.authService.currentUserValue.id;
    }
    if (this.currentUser?.username) {
      this.getUserByUsername(this.currentUser.username);
    }
    this.getAllLocations();
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
  
    public getLocation(id: number): void {
      this.locationService.getOblast(id).subscribe(
        (response: Oblast) => this.location = response,
        (error: HttpErrorResponse) => console.log(error.message)
      )
    }

    public getDistrict(id: number): void {
      this.locationService.getDistrict(id).subscribe(
        (response: District) => this.district = response,
        (error: HttpErrorResponse) => console.log(error.message)
      )
    }
    
    public getAllLocations(): void {
      this.locationService.getAllLocations().subscribe(
        (response: Oblast[]) => this.locations = response,
        (error: HttpErrorResponse) => console.log(error.message)
      );
    }
  
  onOblastChange(): void {
    // при выборе области переходим к выбору района
    const oblast = this.locations.find(o => o.id === this.selectedOblastId);
    this.districts = oblast?.districts ?? [];
    this.selectedDistrictId = null;
    this.isChoosingOblast = false;
  }

  onDistrictChange(): void {
    // тут можно эмитить событие или менять роутинг
    console.log('Выбран район', this.selectedDistrictId);
  }

  backToOblasts(): void {
    // сброс выбора района и возвращаемся к списку областей
    this.isChoosingOblast = true;
    this.selectedOblastId = null;
    this.districts = [];
  }

  logout(){
    this.isAdmin = false;
    this.isLoggedIn = false;
    this.authService.logout();
  }
}
