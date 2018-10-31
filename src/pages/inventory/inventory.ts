import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormControl} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import {InventoryServiceProvider} from '../../providers/inventory-service/inventory-service';

/**
 * Generated class for the InventoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inventory',
  templateUrl: 'inventory.html',
})
export class InventoryPage {
  items: any;
  searchTerm: string = '';
  searchControl: FormControl;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public inventoryService: InventoryServiceProvider) {
    this.searchControl = new FormControl();
  }

  ionViewDidLoad() {
    this.setFilteredItems();
    this.searchControl.valueChanges.debounceTime(700).subscribe(search  => {
      this.setFilteredItems();
    });
  }
  setFilteredItems() {
    this.inventoryService.getProducts(this.searchTerm).then(response=>{
      this.items = response
    })
  }
}
