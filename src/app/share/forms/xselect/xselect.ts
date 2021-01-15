import { Component, OnInit, Input, ElementRef, Output, EventEmitter, ViewEncapsulation} from '@angular/core';
import _ from 'lodash';
declare var $;

@Component({
    selector: 'xselect',
    styleUrls: ['./xselect.scss'],
    templateUrl: './xselect.html',
    encapsulation: ViewEncapsulation.None
})
export class XSelect implements OnInit {
    ctrl: any;
    id: string;
    @Input() name: string;
    @Input() label?: string = '';
    @Input() placeholder: string = '';
    @Input() options: any = [];
    @Input() form: any = {};
    @Input() labelClass = '';
    @Input() multiple = false;
    @Output() changed = new EventEmitter();
    @Input() isDisabled: boolean = false;

    constructor(
        private el: ElementRef,
    ) {}

    ngOnInit() {
        // this.placeholder = this.placeholder || 'Please select';
        this.ctrl = this.form && this.form.formGroup.controls[this.name] || {};
        this.id = 'form-select-' + this.name;
        
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
        // console.log($(this.el.nativeElement).closest("form"), $(this.el.nativeElement).closest("form").hasClass)
        if (getTypeOfForm && getTypeOfForm.hasClass("form-inline")) {
            this.labelClass = 'col-sm-3';
        }
    }

    select(event) {
        // console.log(event);
        // event.preventDefault();
        // event.stopPropagation();
        this.changed.emit(event.value);
    }
}
