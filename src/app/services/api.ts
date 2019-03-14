import { Injectable, Inject } from '@angular/core';
import _ from 'lodash';
let Promise = (<any>window).Promise || require('promise');
import { conf } from './conf';
import { Notify } from "./notify";
import { Core } from "./core";

@Injectable()
export class Api {
    defaultHeaders = {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
    ws: any;

    constructor(
        private msg: Notify,
        private core: Core,
        @Inject(conf) private conf: any) {

    }

    send(method, url, data, headers, options) {
        // set default options
        options = _.assign({error: true, getAll: false, wait: true, ajax: {}}, options || {});
       
        data = data || {};
        headers = headers ? headers : {};
        headers = _.assign({}, this.defaultHeaders, headers)
        if (this.conf.user.access_token && !_.includes(url, this.conf.apis.auth)) {
            headers.Authorization = 'Bearer ' + this.conf.user.access_token;
        }

        var promise = new Promise((resolve, reject) => {
            // this.progress.start();
            // this.conf.progress = true;
            pace.track(() => {
                // Show the loading button only when the request method is PUT, PATCH, POST
                if(method !== 'GET' && method !== 'DELETE') this.loadingService.show(url);
                $.ajax({
                    url: this.url(url),
                    method, headers, data,
                    ...options.ajax,
                })
                .done((res, status, xhr) => {
                    // this.progress.done();
                    // this.conf.progress = false;
                    resolve(_.get(options, 'getAll') ? {res, status, xhr} : res);
                })
                .fail((xhr, status, err) => {
                    // this.progress.done();
                    // this.conf.progress = false;
                    reject({xhr, status, err, url});

                    if (_.get(options, 'error')) {
                        this.handleErrors(xhr, status, err, url);
                    }
                })
                .always(() => {
                    // invoke the hide method for the loading Service that hides the loading button only when the method is PUT, PATCH, POST
                    if(method !== 'GET' && method !== 'DELETE') this.loadingService.hide(url);
                });
            });
        });

        return promise;
    }

    url(url) {
        return this.conf.server + url;
    }

    get(url, query?: any, headers?: any, options?: any) {
        return this.send('GET', url, query, headers, options);
    }

    post(url, data?, headers?: any, options?: any) {
        return this.send('POST', url, data, headers, options);
    }

    put(url, data, headers?: any, options?: any) {
        return this.send('PUT', url, data, headers, options);
    }

    patch(url, data, headers?: any, options?: any) {
        return this.send('PATCH', url, data, headers, options);
    }

    remove(url, headers?: any, options?: any) {
        return this.send('DELETE', url, {}, headers, options);
    }

    upload(url, file, headers) {
        
    }

    download(url) {
        
    }

    handleErrors(xhr, status, err, url) {
        const msg = _.get(xhr, 'responseJSON.error_description') || _.get(xhr, 'responseJSON.message') || "Server error";
        // console.log(xhr, status, err, url)
        if (xhr.status !== 401 && msg) {
            // do not show error message when image urls return 404
            if (xhr.status === 404 && _.includes(['photo', 'logo', 'welcomeimage'], _.last(url.split('/')))) return false;

            this.msg.error(msg);
        } else if (xhr.status === 401) {
            // the session has expired - logout the user
            this.core.removeLocal('user');
            this.conf.user = {};
            this.conf.cache = {};
            this.core.goto('/public');
        }
        // console.log(xhr, status, err);
    }
}