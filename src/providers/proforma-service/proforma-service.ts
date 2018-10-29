import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {API_ENDPOINT} from '../constants';

/*
  Generated class for the ProformaServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProformaServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ProformaServiceProvider Provider');
  }

  getAllClients() {
    let token = localStorage.getItem('tk')
    return new Promise((resolve, reject) => {
      this.http.get(API_ENDPOINT + '/clients', {headers: {'x-access-token': token}})
        .subscribe(data => {
          resolve(data);
        }, err => {
          reject(err)
        });
    });
  }
}
