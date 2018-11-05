import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Platform, ViewController  } from 'ionic-angular';

import {FormControl} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

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
  searchTerm: string = '';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController) {
  }

  openModal(characterNum) {
    let modal = this.modalCtrl.create(ModalContentPage, characterNum);
    modal.present();

    modal.onDidDismiss(data => {
      console.log(data);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
}

@Component({
  templateUrl: 'modal-content.html'
})
export class ModalContentPage {
  character;
  items: any;
  searchTerm: string = '';
  searchControl: FormControl;

  constructor(public platform: Platform,
              public params: NavParams,
              public viewCtrl: ViewController,
              public proformaService: ProformaServiceProvider) {
    // this.character = characters[this.params.get('charNum')];
    this.searchControl = new FormControl();
  }


  ionViewDidLoad() {
    // this.setFilteredItems();
    this.searchControl.valueChanges.debounceTime(700).subscribe(search  => {
      this.setFilteredClients();
    });
  }
  setFilteredClients() {
    this.proformaService.getClients(this.searchTerm).then(response => {
      this.items = response
      console.log('---->', this.items);
    })
  }

  dismiss() {
    let data = {'foo': 'bar'};
    this.viewCtrl.dismiss(data);
  }
}
