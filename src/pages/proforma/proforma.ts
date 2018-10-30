import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {ProformaServiceProvider} from '../../providers/proforma-service/proforma-service';

/**
 * Generated class for the ProformaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-proforma',
  templateUrl: 'proforma.html',
})
  export class ProformaPage {
  items: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public proformaService:ProformaServiceProvider) {
    this.initializeItems();
  }

  initializeItems() {

    this.proformaService.getAllClients().then(response=>{
      console.log(response);
      this.items = response
    })
  }
  getItems(ev: any) {
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
    console.log('ionViewDidLoad ProformaPage');
  }

}
