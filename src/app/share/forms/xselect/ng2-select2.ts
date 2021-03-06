import {
    AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy,
    Output, SimpleChanges, ViewChild, ViewEncapsulation, Renderer, OnInit
} from '@angular/core';
import { TranslateService } from '../../../translate/translate.service';

import _ from 'lodash';

import { Select2OptionData } from './ng2-select2.interface';
declare var jQuery;

@Component({
    selector: 'select2',
    template: `
        <div *ngIf="form" [formGroup]="form.getForm()">
            <select #selector name="{{name}}" formControlName="{{name}}">
                <ng-content select="option, optgroup">
                </ng-content>
            </select>
        </div>
        <select #selector name="{{name}}" *ngIf="!form">
            <ng-content select="option, optgroup">
            </ng-content>
        </select>`,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Select2 implements AfterViewInit, OnChanges, OnDestroy, OnInit {
    @ViewChild('selector') selector: ElementRef;

    @Input() name: string;

    @Input() form: any;

    // data for select2 drop down
    @Input() data: Array<Select2OptionData>;

    // value for select2
    @Input() value: string | string[];

    // enable / disable default style for select2
    @Input() cssImport: boolean = false;

    // width of select2 input
    @Input() width: string;

    // enable / disable select2
    @Input() disabled: boolean = false;

    @Input() placeholder?: string;

    @Input() multiple: boolean = false;

    // all additional options
    @Input() options: Select2Options;

    // emitter when value is changed
    @Output() valueChanged = new EventEmitter();

    private element: JQuery = undefined;
    private check: boolean = false;

    constructor(
        private renderer: Renderer,
        private t: TranslateService
    ) { }

    ngOnInit() {
        if(this.cssImport) {
            const head = document.getElementsByTagName('head')[0];
            const link: any = head.children[head.children.length-1];

            if(!link.version) {
                const newLink = this.renderer.createElement(head, 'style');
                this.renderer.setElementProperty(newLink, 'type', 'text/css');
                this.renderer.setElementProperty(newLink, 'version', 'select2');
                this.renderer.setElementProperty(newLink, 'innerHTML', this.style);
            }

        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if(!this.element) {
            return;
        }

        if(changes['data'] && JSON.stringify(changes['data'].previousValue) !== JSON.stringify(changes['data'].currentValue)) {
            this.initPlugin();
            // const newValue: string = this.element.val();
            // when new dropdown data is comming the proper value should be set (THEC-1665)
            this.setElementValue(this.value);

            this.valueChanged.emit({
                value: this.value,
                data: this.element.select2('data')
            });
        }

        if(changes['value'] && changes['value'].previousValue !== changes['value'].currentValue) {
            const newValue: string = changes['value'].currentValue;

            this.setElementValue(newValue);

            this.valueChanged.emit({
                value: newValue,
                data: this.element.select2('data')
            });
        }

        if (this.disabled) {
            this.renderer.setElementProperty(this.selector.nativeElement, 'disabled', this.disabled);
        }
    }

    ngAfterViewInit() {
        this.element = jQuery(this.selector.nativeElement);
        this.initPlugin();

        if (typeof this.value !== 'undefined') {
            this.setElementValue(this.value);
        }

        this.element.on('select2:select select2:unselect', () => {
            if (this.form) {
                this.form.setValue(this.name, this.element.val());
            }

            this.valueChanged.emit({
                value: this.element.val(),
                data: this.element.select2('data')
            });
        });
    }

    ngOnDestroy() {
        this.element && this.element.off("select2:select");
    }

    private initPlugin() {
        if (!this.element.select2) {
            if(!this.check) {
                this.check = true;
                console.log("Please add Select2 library (js file) to the project. You can download it from https://github.com/select2/select2/tree/master/dist/js.");
            }

            return;
        }

        // If select2 already initialized remove him and remove all tags inside
        if (this.element.hasClass('select2-hidden-accessible') == true) {
            this.element.select2('destroy');
            this.renderer.setElementProperty(this.selector.nativeElement, 'innerHTML', '');
        }
        const data = _.map(this.data, (option) => {
            return _.assign({}, option, { text: this.t.instant(option.text) });
        })
        let options: Select2Options = {
            data: data,
            multiple: this.multiple,
            // allowClear: true,
            // placeholder: this.placeholder || '',
            width: (this.width) ? this.width : 'resolve',
            minimumResultsForSearch: 10,
        };

        if (this.placeholder) options.placeholder = this.placeholder;

        Object.assign(options, this.options);

        if (options.matcher) {
            jQuery.fn.select2.amd.require(['select2/compat/matcher'], (oldMatcher: any) => {
                options.matcher = oldMatcher(options.matcher);
                this.element.select2(options);

                if (typeof this.value !== 'undefined') {
                    this.setElementValue(this.value);
                }
            });
        } else {
            this.element.select2(options);
        }

        if (this.disabled) {
            this.renderer.setElementProperty(this.selector.nativeElement, 'disabled', this.disabled);
        }
    }

    private setElementValue (newValue: string | string[]) {
        if(Array.isArray(newValue)) {
            for (let option of this.selector.nativeElement.options) {
                if (newValue.indexOf(option.value) > -1) {
                    this.renderer.setElementProperty(option, 'selected', 'true');
                }
           }
        } else {
            this.renderer.setElementProperty(this.selector.nativeElement, 'value', newValue);
        }

        if (this.form) {
            this.form.setValue(this.name, newValue);
        }

        this.element.trigger('change.select2');
    }

    private style: string = `CSS`;
}
