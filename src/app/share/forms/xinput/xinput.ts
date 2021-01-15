import { Component, OnInit, Input, ElementRef, ChangeDetectorRef } from '@angular/core';
import _ from 'lodash';

@Component({
  selector: 'xinput',
  // styleUrls: ['./xinput.scss'],
  templateUrl: './xinput.html'
})
export class XInput implements OnInit {
  // current input's controller
  ctrl: any;
  @Input() name: string;
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() id: string;
  @Input() form: any = {};
  @Input() labelClass = '';
  @Input() maxLenght: number = 9999;
  @Input() isDisabled: boolean = false;

  constructor(
    private el: ElementRef,
    // private change: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.id = this.id ?? 'form-' + this?.name;
  }

  ngOnChanges(changes) {
    this.ctrl = this.form?.formGroup.controls[this.name] || {};
    // console.log(changes, this.ctrl);
    if (changes?.isDisabled?.currentValue === true) {
      this.ctrl?.disable();
    } else {
      this.ctrl?.enable();
    }
  }

}
