import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  user: User;
  activeRoute: string;
  userSubs: Subscription;
  routeSub: Subscription;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.user = this.userService.user;

    this.userSubs = this.userService.user$.subscribe((user: User) => {
      this.user = user;
    });

    this.routeSub = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.activeRoute = this.router.url;
        }
      });
  }

  logout() {
    this.userService.logout();
  }

  ngOnDestroy() {
    this.userSubs?.unsubscribe();
    this.routeSub?.unsubscribe();
  }
}
