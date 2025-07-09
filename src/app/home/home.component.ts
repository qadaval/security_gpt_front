import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { AuthenticationService } from "../service/auth.service";
import { Router } from '@angular/router';
import {User} from "../model/user";
import {NgIf} from "@angular/common";
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatButtonModule,
    NgIf
  ],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit{
  currentUser: User | null = null;

  constructor(private authService: AuthenticationService, private router: Router) {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
      if (!user) {
        this.router.navigate(['/login']);
      }
    });
  }
  ngOnInit(): void {
    if (this.currentUser?.username && this.currentUser) {
      this.getUserByUsername(this.currentUser.username);
    }
  }

  logout() {
    this.authService.logout();
  }

  public getUserByUsername(username: string): void {
    this.authService.getUserByUsername(username).subscribe(
      (response: User) => {
        this.currentUser = response;
        console.log("User Current: ", this.currentUser);
      }, (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )
  }
}
