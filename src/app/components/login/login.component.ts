import {Component} from '@angular/core';
import { NgForm} from '@angular/forms';
import {Auth, Notify} from '@app/index';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    constructor(private auth: Auth, private msg: Notify) {}

    submit(form: NgForm) {
        if (form.valid) {
            this.auth.login(form.value.username, form.value.password);
        } else {
            this.msg.error('Please fill all the fields');
        }
    }    
}
