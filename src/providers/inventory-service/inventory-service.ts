import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {API_ENDPOINT} from '../constants';

/*
  Generated class for the InventoryServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InventoryServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello InventoryServiceProvider Provider');
  }

  getProducts(searchTerm) {
    let token = localStorage.getItem('tk')
    return new Promise((resolve, reject) => {
      this.http.get(API_ENDPOINT + '/inventory' + '?like=' + searchTerm.trim(),
        {
          headers: {
            'x-access-token': token,
            'userName': JSON.parse(localStorage.getItem('usr')).firstName + ' '+JSON.parse(localStorage.getItem('usr')).firstSurname,
            'ci': JSON.parse(localStorage.getItem('usr')).ci
          }
        }
      )
        .subscribe(data => {
          resolve(data);
        }, err => {
          reject(err)
        });
    });
  }
}
