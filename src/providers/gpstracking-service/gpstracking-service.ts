import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {API_ENDPOINT} from '../constants';

/*
  Generated class for the GpstrackingServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GpstrackingServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello GpstrackingServiceProvider Provider');
  }

  createCoordinate(coordinate){
    return new Promise((resolve, reject) => {
      this.http.post(API_ENDPOINT + '/gpsTracking/sellers', coordinate,  {
        headers: {
          'userName': JSON.parse(localStorage.getItem('usr')).firstName + ' '+JSON.parse(localStorage.getItem('usr')).firstSurname,
          'ci': JSON.parse(localStorage.getItem('usr')).ci
        }
      }).subscribe(data => {
        console.log(data);
        resolve(data);
      }, err => {
        reject(err)
      });
    });
  }

  setGpsStatus(status, userId) {
    return new Promise((resolve, reject) => {
      this.http.put(API_ENDPOINT + `/gpsTracking/trackStatus/${status === 'on' ? 1 : 2}`, {userId: userId},
        {
          headers: {
            'userName': JSON.parse(localStorage.getItem('usr')).firstName + ' ' + JSON.parse(localStorage.getItem('usr')).firstSurname,
            'ci': JSON.parse(localStorage.getItem('usr')).ci
          }
        }
      ).subscribe(data => {
        console.log(data);
        resolve(data);
      }, err => {
        reject(err)
      });
    });
  }
}
