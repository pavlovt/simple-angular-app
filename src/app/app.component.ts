import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'App';

  subscriptions: Subscription[] = [];

  loggedIn = false;

  showMenu: boolean = true;

  constructor() { }

  ngOnInit() {

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  checkAccount() {

  }

  login() {

  }

  logout() {
    // this.authService.logout();
  }
}
