import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

let apiUrl  = "http://192.168.0.15:3000/";

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  constructor(public http: HttpClient) {
  }

  getData(credentials, type) {
    return this.http.get(apiUrl+'employers');
  }
}
