import { Component } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { AuthenticationService } from "../service/auth.service";
import { Router } from '@angular/router';
import {User} from "../model/user";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatButtonModule,
    NgIf
  ],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  currentUser: User | null = null;

  constructor(private authService: AuthenticationService, private router: Router) {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
      if (!user) {
        this.router.navigate(['/login']);
      }
    });
  }

  logout() {
    this.authService.logout();
  }
}
