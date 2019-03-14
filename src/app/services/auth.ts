import { Injectable, Inject } from '@angular/core';
import { Notify } from "./Notify";
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
    
    async login(username, password, onError) {
        this.user = {};
        try {
            // the user loks like
            // {"access_token":"03c85e48-93ff-4af4-88d2-fead8c5bcf57","token_type":"bearer","refresh_token":"46117d1a-2f1c-4ed5-9d0c-ff4ea92ab73a","expires_in":43108,"scope":"read"}
            this.user = await this.api.post(
                this.conf.apis.auth,
                {grant_type: 'password', username: username, password: password, scope: 'read'},
                {'Content-Type': 'application/x-www-form-urlencoded', Authorization: 'Basic aXZpc2l0b3Itd2ViOml2aXNpdG9yLXNlY3JldA=='});

            this.user.username = username;
            // this.core.saveLocal('user', this.user);
            this.conf.user = this.user;
            
            const redirectUrl = this.core.getLocal('redirectUrl');
            this.core.goto(redirectUrl || '/dashboard');

            this.msg.info('You are logged in');
            this.core.removeLocal('redirectUrl');
        } catch(err) {
            // call error callback
            onError && onError();
        }
    }

    logout() {
        this.core.removeLocal('user');
        this.core.removeLocal('userInfo');
        this.core.removeLocal('userRoles');
        this.core.removeLocal('userLocations');
        
        this.conf.user = {};
        this.conf.cache = {};
        this.core.goto('/public');
        this.msg.info('You are logged out');
        this.api.get(this.conf.apis.logout);
    }

    isAuth() {
        return !!this.conf.user.access_token;
    }



}
