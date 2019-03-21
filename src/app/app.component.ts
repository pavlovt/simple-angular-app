import { Component } from '@angular/core';
import {Auth} from '@app/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'z';
  constructor(private auth: Auth) {}
}
