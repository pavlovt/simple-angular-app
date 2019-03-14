import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import _ from 'lodash';
import {Notify} from './notify';
import {conf} from './conf';

declare var $;

/**
 * Contains common methods
 */
@Injectable()
export class Core {
        constructor(
            public router: Router,
            public msg: Notify,
            @Inject(conf) private conf: any,
        ) {}

        /**
         * Go to other page without reloading the site
         * @param {string} path   Path to go to
         * @param {object} params Params that are needed by the path
         */
        goto(path, params?: any) {
            this.router.navigate([path, params || {}]);
        }

        // return true if the value is [], {}, "", null, undefined
        empty(val) {
            return _.isEmpty(val) && !_.isNumber(val) && !_.isDate(val);
        }

        saveLocal(prop, val) {
            val = !_.isString(val) ? JSON.stringify(val) : val;
            localStorage.setItem(prop, val);
        }

        getLocal(prop) {
            let res;
            // maybe it is json?
            try {
                res = JSON.parse(localStorage.getItem(prop));
            } catch (err) {
                res = localStorage.getItem(prop);
            }

            return res;
        }

        removeLocal(prop) {
            localStorage.removeItem(prop);
        }

        // truncate the string and given length (cut) adding ... if truncate
        truncate(string, cut) {
            cut = cut || 30
            if (string !== undefined && string.length > cut) {
                let newString = string.slice(0, cut) + '...';
                return newString;
            } else {
                return string;
            }
        }

        debounce(callback, wait: number = 300) {
            return _.debounce(callback, wait, {leading: false, trailing: true});
        }

        b64toBlob(b64Data, contentType = '', sliceSize = 512) {
            const byteCharacters = atob(b64Data);
            const byteArrays = [];

            for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                let slice = byteCharacters.slice(offset, offset + sliceSize);

                let byteNumbers = new Array(slice.length);
                for (let i = 0; i < slice.length; i++) {
                  byteNumbers[i] = slice.charCodeAt(i);
                }

                let byteArray = new Uint8Array(byteNumbers);

                byteArrays.push(byteArray);
            }

            let blob = new Blob(byteArrays, {type: contentType});
            return blob;
        }

        // Function for formating phones that could be use in string literals out of Angular scope
        formatPhone(val) {
            if (!val || val === '') return null;
            let out = val ? val.replace(/\D/g, '') : '';
  
            if (out.length > 3) {
              out = out.substr(0, 3) + ' ' + out.substr(3, out.length);
            }
            if (out.length > 7) {
              out = out.substr(0, 7) + '-' + out.substr(7, out.length);
            }
            return out;
      }

      // if the url = /settings/location/102/users and param = location
      // then function will return 102
      getUrlParam(param) {
          const path = location.pathname.split('/');
          const pos = _.findIndex(path, (v:any) => v === param);
          return pos > 0 ? path[pos+1] : null;
      }

      getQueryParam(variable) {
          var query = window.location.search.substring(1);
          var vars = query.split('&');
          for (var i = 0; i < vars.length; i++) {
              var pair = vars[i].split('=');
              if (decodeURIComponent(pair[0]) == variable) {
                  return decodeURIComponent(pair[1]);
              }
          }
      }

      // check if the current user has at least one of this roles
      hasRole(roles) {
          roles = _.isString(roles) ? [roles] : roles;

          return !_.isEmpty(_.intersection(this.conf.userRoles, roles));
      }

      // convert base64 image to blob
      base2Blob(dataURI) {
          // convert base64 to raw binary data held in a string
          // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
          var byteString = atob(dataURI);
          // separate out the mime component
          var mimeString = dataURI;
          // write the bytes of the string to an ArrayBuffer
          var ab = new ArrayBuffer(byteString.length);
          var ia = new Uint8Array(ab);
          for (var i = 0; i < byteString.length; i++) {
              ia[i] = byteString.charCodeAt(i);
          }
          // write the ArrayBuffer to a blob, and you're done
          var bb = new Blob([ab], {type: 'image/jpeg'});
          return bb;
      }

}
