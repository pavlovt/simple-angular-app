import { Injectable } from '@angular/core';
import alertify from 'alertifyjs';
import { TranslateService } from '../../shared';

@Injectable()
export class Notify {
    alertify = alertify;
    constructor(
        private t: TranslateService
    ) {
        // change the log template if needed
        /*alertify
        .setLogTemplate(function (input) {
            return input;
        });*/
        alertify.set('notifier', 'position', 'bottom-right');
        alertify.set('notifier', 'delay', 10);
        alertify.defaults.glossary.title = '';
    }

    info(msg, placeholderArgs?: string | string[]) {
        alertify.success(this.t.instant(msg, placeholderArgs));
    }

    error(msg, placeholderArgs?: string | string[]) {
        // console.log(msg, this.t.instant(msg), this.t.currentLang)
        alertify.error(this.t.instant(msg, placeholderArgs));
    }

    confirm(msg, title = '', okFn, cancelFn = null, placeholderArgs?: string | string[]) {
        // confirm dialog
        alertify.defaults.glossary.title = title;
        alertify.confirm(this.t.instant(msg, placeholderArgs), okFn, cancelFn);        
    }
}
