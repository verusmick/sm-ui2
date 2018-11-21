import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
// import {EditOrderPage} from '../edit-order/edit-order'
import {ProformaPage} from '../proforma/proforma'

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
  orderList: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public proformaService: ProformaServiceProvider) {
  }

  getAllOrders() {
    this.proformaService.getAllOrders().then(response => {
      this.orderList = this.filterOrderList(response);
    })
  }

  filterOrderList (orders){
    let orderListReturn =[]
    let userId = JSON.parse(localStorage.getItem('usr')).ci;
    orders.forEach(order=>{
      if(order.userId === userId){
        orderListReturn.push(order);
      }
    })
    return orderListReturn;
  }

  viewOrder(item) {
    // console.log('-->', item);
    this.navCtrl.setRoot(ProformaPage, {
      order: item
    });
  }

  deleteOrder(item) {
    this.proformaService.deleteOrder(item.orderId).then(response => {
      let indexItem = null;

      this.orderList.forEach((order, index) => {
        if (order.orderId === item.orderId) {
          indexItem = index
        }
      });
      this.orderList.splice(indexItem, 1);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdersPage');
    this.getAllOrders();
  }
}
