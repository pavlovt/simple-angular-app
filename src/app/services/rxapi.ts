import { Injectable, Inject } from '@angular/core';
// import { Http, Headers, RequestOptions, Request } from '@angular/http'; // RequestOptionsArgs
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import _ from 'lodash';
let Promise = (<any>window).Promise || require('promise');
import { conf } from './../../app.conf';
import { Notify } from "./notify";
import { Core } from "./core";
import pace from '../../../assets/js/pace/pace.min';

/**
 * Backend API service which uses Angular's Http service (RX.js 5.0)
 */
@Injectable()
export class RxApi {
    defaultHeaders = {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
    ws: any;

    constructor(
        private msg: Notify,
        private core: Core,
        private http: HttpClient,
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
        headers = new HttpHeaders(headers);
        let rxOptions = {responseType: 'json', headers: headers, ...options.ajax};
        const req = new HttpRequest(method, this.url(url), rxOptions);

        return this.http.request(req)
            .map((res:any) => res.body)
            /*.debounceTime(400)
            .switchMap((res:any) => {
                console.log(res);
                return res.body ? res.body : null;
            })*/


        /*var promise = new Promise((resolve, reject) => {
            // this.progress.start();
            // this.conf.progress = true;
            pace.track(() => {
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
                    reject({xhr, status, err});

                    if (_.get(options, 'error')) {
                        this.handleErrors(xhr, status, err);
                    }
                })
            })
        });

        return promise;*/
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

    handleErrors(xhr, status, err) {
        const msg = _.get(xhr, 'responseJSON.error_description') || _.get(xhr, 'responseJSON.message');
        if (xhr.status !== 401 && msg) {
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