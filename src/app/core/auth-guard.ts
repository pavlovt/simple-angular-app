import { Injectable, Inject } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Auth } from './auth';
import { Core } from './core';
import { conf } from './conf';
import _ from 'lodash';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private auth: Auth,
        private core: Core,
        @Inject(conf) private conf: any,
    ) {}

    canActivate(unused, route) {
        if (!this.auth.isAuth()) {
            this.core.goto('/public');
        }
        
        // check if a substring in the conf.access.pages includes a substring of the route.url
        const checkForSubstring = _.keys(this.conf.access.pages).find(e => route.url.includes(e));
        const userCheck = _.isEmpty(_.intersection((this.conf.access.pages[checkForSubstring] || []), this.conf.userRoles));
        // If user is logged but has no roles something is wrong and it should log in again
        if (userCheck && route.url === '/dashboard') this.auth.logout();
        // check if logged in user's role has access to this page
        else if (userCheck) {
            this.core.saveLocal('redirectUrl', route.url);
            this.core.goto(this.conf.defaultRoute);
        }
        return this.auth.isAuth();
    }
}
