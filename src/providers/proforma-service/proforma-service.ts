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

  getClients(searchTerm) {
    let token = localStorage.getItem('tk')
    return new Promise((resolve, reject) => {
      this.http.get(API_ENDPOINT + '/clients'+'?like='+searchTerm.trim(), {headers: {'x-access-token': token}})
        .subscribe(data => {
          resolve(data);
        }, err => {
          reject(err)
        });
    });
  }

  getProducts(searchTerm) {
    let token = localStorage.getItem('tk')
    return new Promise((resolve, reject) => {
      this.http.get(API_ENDPOINT + '/inventory'+'?like='+searchTerm.trim(), {headers: {'x-access-token': token}})
        .subscribe(data => {
          resolve(data);
        }, err => {
          reject(err)
        });
    });
  }

  saveProforma(proformaObj) {
    let token = localStorage.getItem('tk');
    let userId = JSON.parse(localStorage.getItem('usr')).ci
    return new Promise((resolve, reject) => {
      this.http.post(API_ENDPOINT + '/orders', proformaObj, {
        headers: {
          'x-access-token': token,
          'userid': userId
        }
      }).subscribe(data => {
        resolve(data);
      }, err => {
        reject(err)
      });
    });
  }

  getAllOrders(){
    let token = localStorage.getItem('tk');
    let userId = JSON.parse(localStorage.getItem('usr')).ci
    return new Promise((resolve, reject) => {
      this.http.get(API_ENDPOINT + '/orders', {
        headers: {
          'x-access-token': token,
          'userid': userId
        }
      }).subscribe(data => {
        resolve(data);
      }, err => {
        reject(err)
      });
    });
  }
}
