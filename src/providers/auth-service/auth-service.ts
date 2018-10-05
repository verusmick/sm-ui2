import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {API_ENDPOINT} from '../constants';

/*
 Generated class for the AuthServiceProvider provider.

 See https://angular.io/guide/dependency-injection for more info on providers
 and Angular DI.
 */
@Injectable()
export class AuthServiceProvider {

  constructor(public http: HttpClient) {
  }

  login(authUserData) {
    return new Promise((resolve, reject) => {
      this.http.post(API_ENDPOINT + '/users/authenticate', authUserData).subscribe(data => {
        console.log(data);
        resolve(data);
      }, err => {
        reject(err)
      });
    });
  }
}
