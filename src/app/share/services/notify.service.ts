import { Injectable } from '@angular/core';
import alertify from 'alertifyjs';

@Injectable()
export class NotifyService {
  alertify = alertify;
  constructor() {
    // change the log template if needed
    /*alertify
    .setLogTemplate(function (input) {
        return input;
    });*/
    alertify.set('notifier', 'position', 'bottom-right');
    alertify.set('notifier', 'delay', 10);
    alertify.defaults.glossary.title = '';
  }

  info(msg: string) {
    alertify.success(msg);
  }

  error(msg: string) {
    // console.log(msg, this.t.instant(msg), this.t.currentLang)
    alertify.error(msg);
  }

  confirm(msg: string, title = '', okFn: Function, cancelFn: Function | null = null) {
    // confirm dialog
    alertify.defaults.glossary.title = title;
    alertify.confirm(msg, okFn, cancelFn);
  }
}
