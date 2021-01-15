import { Component, OnInit, Input, ElementRef, ChangeDetectorRef } from '@angular/core';
import _ from 'lodash';
declare var $;

@Component({
    selector: 'xarea',
    styleUrls: ['./xarea.scss'],
    templateUrl: './xarea.html'
})
export class XArea implements OnInit {
    // current input's controller
    ctrl: any;
    isFirst: boolean = false;
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
    ) {}

    ngOnInit() {
        this.id = this.id || 'form-' + this.name;
    }

    ngOnChanges(changes) {
        this.ctrl = this.form && this.form.formGroup.controls[this.name] || {};
        // console.log(changes, this.ctrl);
        if (_.get(changes, 'isDisabled.currentValue') === true) {
            this.ctrl.disable && this.ctrl.disable();
        } else {
            this.ctrl.enable && this.ctrl.enable();
        }
    }

    ngAfterContentInit() {
        let getTypeOfForm = $(this.el.nativeElement).closest("form");

        let input = $('input', getTypeOfForm).first();
        this.isFirst = $(input).attr('name') === this.name;

        if (getTypeOfForm && getTypeOfForm.hasClass("form-inline")) {
            this.labelClass = 'col-sm-3';
            // this.change.detectChanges();
        }
    }

    onVisible(event) {
        if(event.value === true && this.isFirst) {
            $(event.target).focus();
        }
    }
}
