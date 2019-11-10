import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {API_ENDPOINT} from '../constants';

/*
 Generated class for the ClientServiceProvider provider.

 See https://angular.io/guide/dependency-injection for more info on providers
 and Angular DI.
 */
@Injectable()
export class ClientServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ClientServiceProvider Provider');
  }

  getAll(searchTerm) {
    let token = localStorage.getItem('tk')
    return new Promise((resolve, reject) => {
      this.http.get(API_ENDPOINT + '/clients' + '?like=' + searchTerm.trim(), {
        headers: {
          'x-access-token': token,
          'userName': JSON.parse(localStorage.getItem('usr')).firstName + ' ' + JSON.parse(localStorage.getItem('usr')).firstSurname,
          'ci': JSON.parse(localStorage.getItem('usr')).ci
        }
      })
        .subscribe(data => {
          resolve(data);
        }, err => {
          reject(err)
        });
    });
  }

}
