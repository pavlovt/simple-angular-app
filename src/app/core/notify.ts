import { Injectable } from '@angular/core';
import alertify from 'alertifyjs';

@Injectable()
export class Notify {
    alertify = alertify;
    constructor() {
        alertify.set('notifier', 'position', 'bottom-right');
        alertify.set('notifier', 'delay', 10);
        alertify.defaults.glossary.title = '';
    }

    info(msg) {
        alertify.success(msg);
    }

    error(msg) {
        alertify.error(msg);
    }

    confirm(msg, title = '', okFn, cancelFn = null) {
        // confirm dialog
        alertify.defaults.glossary.title = title;
        alertify.confirm(msg, okFn, cancelFn);        
    }
}
