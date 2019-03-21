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
        if (route.url !== '/login' && !this.auth.isAuth()) {
            // save the page where the user would like to go
            // so he could be redirected there after he logs in
            this.core.saveLocal('redirectUrl', route.url);
            this.core.goto('/login');
        }
        
        return this.auth.isAuth();
    }
}
