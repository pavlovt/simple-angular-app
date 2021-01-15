import { Component, OnInit } from '@angular/core';
import { FormManager } from '../../index';

@Component({
  selector: 'tst-form',
  templateUrl: './tst-form.component.html',
  // styleUrls: ['./tst-form.component.css']
})
export class TstFormComponent implements OnInit {
  form;

  constructor() { }

  ngOnInit() {
    this.form = new FormManager({
      'name': 'required',
      'email': 'required|email',
    })
  }

  submitForm(event) {
    event.preventDefault();
    let data = this.form.getData();
    console.log('data', data);
  }

}
