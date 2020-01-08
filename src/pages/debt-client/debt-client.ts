import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormControl} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

import {ClientServiceProvider} from '../../providers/client-service/client-service';
/**
 * Generated class for the DebtClientPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-debt-client',
  templateUrl: 'debt-client.html',
})
export class DebtClientPage {
  items: any[any] ;
  searchTerm: string = '';
  filterUpperDebtParam: boolean = false;
  searchControl: FormControl;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public clientService: ClientServiceProvider) {
    this.searchControl = new FormControl();
  }

  ionViewDidLoad() {
    this.setFilteredItems();
    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
      this.setFilteredItems();
    });
  }

  setFilteredItems() {
    this.clientService.getAll(this.searchTerm, '>0').then((response: any[]) => {
      response.sort((a, b): number => {
        return b.deuda_actual - a.deuda_actual;
      });
      this.items = response;
      if (this.filterUpperDebtParam) {
        let list = [];
        this.items.forEach(function (item) {
          if (item.deuda_actual >= 20000) {
            list.push(item)
          }
        });
        this.items = list;
      }
    });
  }

  filterUpperDebt(){
    this.filterUpperDebtParam = !this.filterUpperDebtParam;
    this.setFilteredItems();
  }
}
