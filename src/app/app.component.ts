import { Component, Inject } from '@angular/core';
import {Auth, conf, Core} from '@app/index';
import { core } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'z';
  constructor(
    private auth: Auth,
    @Inject(conf) private conf: any,
    private core: Core) {
      this.conf.user = this.core.getLocal('user') || {};
      
  }
}
