import { Component } from '@angular/core';
import {IonicPage, MenuController, NavController, NavParams} from 'ionic-angular';

import {HomePage} from '../home/home'
import {AuthServiceProvider} from '../../providers/auth-service/auth-service'

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  authUserData = {ci: '', password: ''};
  responseData: any;
  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public navParams: NavParams,
    public authService:AuthServiceProvider
  ) {
    this.menuCtrl.enable(false, 'myMenu');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    this.authService.login(this.authUserData).then(data => {
      this.responseData = data;
      localStorage.setItem('usr', JSON.stringify(this.responseData.data.user));
      localStorage.setItem('tk', this.responseData.data.token);
      this.menuCtrl.enable(true, 'myMenu');
      this.navCtrl.setRoot(HomePage);
    }).catch(error => {
      console.error(error);
    })
  }
}
