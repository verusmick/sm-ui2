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
  proformaData = {client: {razon_social: ''}};
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController) {
  }

  openSearchClientModal(characterNum) {
    let searchClientmodal = this.modalCtrl.create(ModalContentPage, characterNum);
    searchClientmodal.present();
    searchClientmodal.onDidDismiss(clientSelected => {
      if(!clientSelected){return false}
      this.proformaData.client = clientSelected
    });
  }

  saveProforma(){
    console.log(this.proformaData);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
}

@Component({
  templateUrl: 'searchClient.modal.html'
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

  selectClient(client) {
    this.dismiss(client)
  }

  setFilteredClients() {
    this.proformaService.getClients(this.searchTerm).then(response => {
      this.items = response;
    })
  }

  dismiss(clientSelected) {
    this.viewCtrl.dismiss(clientSelected);
  }

  ionViewDidLoad() {
    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
      this.setFilteredClients();
    });
  }
}
