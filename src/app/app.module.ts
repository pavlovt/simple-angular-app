import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule }   from '@angular/forms';

// import services
import {conf, AllErrorHandler, Api, AppConf, AuthGuard, Core, Notify, RxApi, Auth, PostService, LimitPipe} from './index';
// import components
import {HomeComponent} from './components/home/home.component';
import {AboutComponent} from './components/about/about.component';
import {PostComponent} from './components/post/post.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    PostComponent,
    LimitPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    Api,
    RxApi,
    Notify,
    Auth,
    AuthGuard,
    Core,
    PostService,
    { provide: conf, useValue: AppConf },
    // custom global angular error handler
    {provide: ErrorHandler, useClass: AllErrorHandler}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
