import { PipeTransform, Pipe } from '@angular/core';
import _ from 'lodash';

@Pipe({
    name: 'limit',
    pure: false
})
export class LimitPipe implements PipeTransform {
    transform(items: any[] = [], limit: number = 10): any[] {
        return _.take(items, limit);
    }
}