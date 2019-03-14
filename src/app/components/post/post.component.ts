import {Component, OnInit} from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {PostService, Notify} from '@app/index';

@Component({
    styleUrls: [
        './post.component.scss'
    ],
    templateUrl: './post.component.html'
})
export class PostComponent implements OnInit {
    id: number;
    item = {};

    constructor(
        private route: ActivatedRoute,
        private post: PostService,
        private msg: Notify,
    ) {
        this.id = route.snapshot.params['id'];
    }

    ngOnInit() {
        this.post.get(this.id)
        .then(res => {
            console.log(res)
            this.item = res;
        })
    }
}
