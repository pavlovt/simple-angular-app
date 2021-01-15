import { Injectable } from '@angular/core';
import { observable, action } from 'mobx-angular';

@Injectable()
class Store {
  @observable count = 0;
  @action inc() {
    this.count++;
  }
}