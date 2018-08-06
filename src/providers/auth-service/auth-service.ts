import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

let apiUrl = "http://192.168.0.17:3000";

/*
 Generated class for the AuthServiceProvider provider.

 See https://angular.io/guide/dependency-injection for more info on providers
 and Angular DI.
 */
@Injectable()
export class AuthServiceProvider {

  constructor(public http: HttpClient) {
  }


  getData() {
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYsImlhdCI6MTUzMzIyMzAxNCwiZXhwIjoxNTMzMjY2MjE0fQ.QnD3sMvGSJURj4N3yEzAS5IjBdxPGz72hWGG8pFP43I';
    return new Promise((resolve,reject) => {
      this.http.get(apiUrl + '/employers', {headers: {'x-access-token':token}}).subscribe(data => {
          resolve(data);},
        err => {
          // console.log(err);
          reject(err)
        });
    });
  }
}


// return this.http.post(apiUrl + '/users',{
//     "firstName": "e",
//     "firstSurname": "a",
//     "secondSurname":"",
//     "ci":"12345678LP",
//     "cellphone":"",
//     "password":"qwerty"
//   },
//   {
//     headers: {
//       'x-access-token':token
//     }
//   }
// );
