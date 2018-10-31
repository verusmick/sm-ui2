import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormControl} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

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
  items: any;
  searchTerm: string = '';
  searchControl: FormControl;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public clientService:ClientServiceProvider) {
    this.searchControl = new FormControl();
  }
  ionViewDidLoad() {
    this.setFilteredItems();
    this.searchControl.valueChanges.debounceTime(700).subscribe(search  => {
      this.setFilteredItems();
    });
  }
  setFilteredItems() {
    this.clientService.getAll(this.searchTerm).then(response=>{
      this.items = response
    })
  }

}
