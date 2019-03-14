import {ErrorHandler} from '@angular/core';
import _ from 'lodash';

/**
 * Custom global error handler
 */
export class AllErrorHandler implements ErrorHandler {
    handleError(error: any) {
        console.log('err', _.toString(error).substring(0,500));
    }
}