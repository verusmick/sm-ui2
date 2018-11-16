import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {ProformaServiceProvider} from '../../providers/proforma-service/proforma-service';
/**
 * Generated class for the OrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public proformaService: ProformaServiceProvider ) {
  }

  getAllOrders() {
    this.proformaService.getAllOrders().then(_ => {
      console.log(_)


    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdersPage');
    this.getAllOrders()
  }

}
