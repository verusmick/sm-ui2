import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  logs: any[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authService:AuthServiceProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    this.authService.getData().subscribe(
      (data) => {
        this.logs = data
        setTimeout(() => {
          this.navCtrl.setRoot(HomePage);
        }, 3000);
      },
      (error) => {
        console.error(error);
      }
    )
  }
}
