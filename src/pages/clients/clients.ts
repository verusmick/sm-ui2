import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {ClientServiceProvider} from '../../providers/client-service/client-service';

/**
 * Generated class for the ClientsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-clients',
  templateUrl: 'clients.html',
})
export class ClientsPage {
  searchQuery: string = '';
  items: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public clientService:ClientServiceProvider) {
    this.initializeItems();
  }
  initializeItems() {

    this.clientService.getAll().then(response=>{
      // this.items = [
      //   'Amsterdam',
      //   'Bogota'
      // ];
      console.log(response);
      this.items = response
    })
  }
  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientsPage');
  }

}
