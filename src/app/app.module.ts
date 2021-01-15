import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ShareModule } from './share/share.module';
import { MobxAngularModule } from 'mobx-angular';
import { Conf } from './conf';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MobxAngularModule,
    ShareModule
  ],
  providers: [Conf],
  bootstrap: [AppComponent]
})
export class AppModule { }
