// ANGULAR
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ReactiveFormsModule } from '@angular/forms'

// PAGES
import { HomeComponent } from '../pages/home/home.component'
import { TstFormComponent } from './components/tst-form/tst-form.component'
import {
  // COMPONENTS
  XInput,
  // SERVICES
  CoreService,
  NotifyService,
  FormManager,
  // PrimeNg COMPONENTS
  ButtonModule,
  CalendarModule,
  InputTextareaModule,
  DropdownModule,
  RadioButtonModule,
  InputTextModule,
  Button,
} from './index'

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
    Button,
  ],
  providers: [CoreService, NotifyService],
})
export class ShareModule {}
