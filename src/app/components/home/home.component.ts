import {Component, OnInit, AfterViewInit} from '@angular/core';
import {PostService, Notify} from '@app/index';

@Component({
    styleUrls: [
        './home.component.scss'
    ],
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, AfterViewInit {
    posts = [];
    constructor(
        private post: PostService,
        private msg: Notify,
    ) {}

    ngOnInit() {
        this.post.list()
        .then(res => {
            console.log(res);
            this.posts = res;
        })
    }

    ngAfterViewInit() {
        this.msg.info('ZZZZZZZZZZZZ')
    }

    remove(evt, postId) {
        evt.preventDefault();
        this.msg.confirm('Are you sure you want to delete this post?', () => {
            this.post.remove(postId);
        })
    }
}
