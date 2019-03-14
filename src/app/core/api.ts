import { Injectable, Inject } from '@angular/core';
import _ from 'lodash';
import { conf } from './conf';
import { Notify } from "./notify";
import { Core } from "./core";
import axios from "axios";

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
        options = _.assign({error: true, getAll: false, ajax: {}}, options || {});
       
        data = data || {};
        headers = headers ? headers : {};
        headers = _.assign({}, this.defaultHeaders, headers);

        if (this.conf.user.access_token) {
            headers.Authorization = 'Bearer ' + this.conf.user.access_token;
        }

        return axios({
            url: this.url(url),
            method, headers, data,
            ...options.ajax,
        })
        .then(res => {
            // res contains {data, status, headers, config, request}
            // https://github.com/axios/axios#response-schema
            // usually we need only the data from the server 
            // but in some case we may need also the other props and then we provide getAll: true
            return _.get(options, 'getAll') ? res : res.data;
        }, err => {
            // in this case use the default error handler
            if (_.get(options, 'error')) {
                this.handleErrors(err);
            }
        });
    }

    url(url) {
        return this.conf.server + url;
    }

    get(url, query?: any, headers?: any, options?: any) {
        return this.send('get', url, query, headers, options);
    }

    post(url, data?, headers?: any, options?: any) {
        return this.send('post', url, data, headers, options);
    }

    put(url, data, headers?: any, options?: any) {
        return this.send('put', url, data, headers, options);
    }

    patch(url, data, headers?: any, options?: any) {
        return this.send('patch', url, data, headers, options);
    }

    remove(url, headers?: any, options?: any) {
        return this.send('delete', url, {}, headers, options);
    }

    upload(url, file, headers) {
        
    }

    download(url) {
        
    }

    // default error handler
    handleErrors(err) {
        // set the default error message if the server is not providing one
        const msg = _.get(err, 'response.message') || "Server error";
        
        if (err.response.status !== 401) {
            this.msg.error(msg);
        } else {
            // the session has expired - logout the user
            this.core.removeLocal('user');
            this.conf.user = {};
            this.conf.cache = {};
            this.core.goto('/public');
            this.msg.error('Your session has expired');
        }
    }
}