import {Component} from '@angular/core';
import { NgForm} from '@angular/forms';
import {Auth} from '@app/index';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    constructor(private auth: Auth) {}

    submit(form: NgForm) {
        this.auth.login(form.value.username, form.value.password)
    }    
}
