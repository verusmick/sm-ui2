import {Component} from '@angular/core';
import {NavController, App} from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  logs: string[] = [];
  user: any;

  constructor(public navCtrl: NavController,
              public app: App) {
    this.user = localStorage.getItem('usr')
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  logout() {
    // Api token
    // const  root = this.app.getRootNavById();
    // root.popToRoot();
  }
}
