import { Injectable, Inject } from '@angular/core';
import { Notify } from "./notify";
import { Api } from "./api";
import { conf } from './conf';
import { Core } from './core';
import _ from 'lodash';

@Injectable()
export class Auth {
    user: any = {};
    locations: any = [];
    constructor(
        public msg: Notify,
        public api: Api,
        public core: Core,
        @Inject(conf) private conf: any) {}
    
    async login(username: string, password: string) {
        this.user = {};
        try {
            // the user looks like
            // just checking the username because of the api limitations
            this.user = await this.api.get(this.conf.api.users + `?username=${username}`)

            this.core.saveLocal('user', this.user);
            this.conf.user = this.user;
            // fake access token
            this.conf.user.access_token = 123;
            
            const redirectUrl = this.core.getLocal('redirectUrl');
            this.core.goto(redirectUrl || this.conf.def.defaultRedirect);

            this.msg.info('You are logged in');
            this.core.removeLocal('redirectUrl');
        } catch(err) {
            // call error callback
            console.log(err);
        }
    }

    logout() {
        this.core.removeLocal('user');
        
        this.conf.user = {};
        this.conf.cache = {};
        this.core.goto('/login');
        this.msg.info('You are logged out');
        // this.api.get(this.conf.apis.logout);
    }

    isAuth() {
        return !!this.conf.user.access_token;
    }
}
