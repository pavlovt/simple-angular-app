// ANGULAR
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

// PAGES
import { HomeComponent } from '../pages/home/home.component';
import { TstFormComponent } from './components/tst-form/tst-form.component';
import {
  // COMPONENTS
  XInput,
  // SERVICES
  CoreService, NotifyService, FormManager,
  // PrimeNg COMPONENTS
  ButtonModule, CalendarModule, InputTextModule, InputTextareaModule, DropdownModule, RadioButtonModule,
} from './index';

@NgModule({
  declarations: [
    // PAGES
    HomeComponent,

    // COMPONENTS
    XInput,
    TstFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    CalendarModule,
    InputTextareaModule,
    RadioButtonModule,
  ],
  exports: [
    // COMPONENTS
    XInput,
    TstFormComponent,
  ],
  providers: [
    CoreService, NotifyService
  ],
})
export class ShareModule { }
