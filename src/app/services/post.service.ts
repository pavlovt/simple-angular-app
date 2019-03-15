import { Injectable, Inject } from '@angular/core';
import _ from 'lodash';
import {conf, Api,  Core, Notify} from '../index';

@Injectable()
export class PostService {
    constructor(
        private api: Api,
        private msg: Notify,
        private core: Core,
        @Inject(conf) private conf: any) {

    }

    list() {
        return this.api.get(this.conf.api.posts);
    }

    get(id) {
        return this.api.get(this.conf.api.posts + '/' + id);
    }

    save(post) {
        if (post && post.id) {
            return this.api.put(this.conf.api.posts + '/' + post.id, post)
            .then(res => {
                this.msg.info('The post was successfully updated');
                return res;
            })
        } else {
            return this.api.post(this.conf.api.posts, post)
            .then(res => {
                this.msg.info('The post was successfully created');
                return res;
            })
        }

    }

    remove(id) {
        return this.api.remove(this.conf.api.posts + '/' + id)
        .then(res => {
            this.msg.info('The post was successfuly deleted');
            return res;
        })
    }
}