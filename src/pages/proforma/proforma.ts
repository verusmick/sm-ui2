import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Platform, ViewController  } from 'ionic-angular';

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
              public modalCtrl: ModalController,
              public proformaService: ProformaServiceProvider) {
  }

  openModal(characterNum) {
    let modal = this.modalCtrl.create(ModalContentPage, characterNum);
    modal.present();
  }

  setFilteredClients() {
    this.proformaService.getClients(this.searchTerm).then(response => {
      this.items = response
      // console.log('---->', this.items);
    })
  }

  ionViewDidLoad() {
    this.setFilteredClients();
    console.log('ionViewDidLoad LoginPage');
  }
}

@Component({
  templateUrl: 'modal-content.html'
})
export class ModalContentPage {
  character;

  constructor(public platform: Platform,
              public params: NavParams,
              public viewCtrl: ViewController) {
    var characters = [
      {
        name: 'Gollum',
        quote: 'Sneaky little hobbitses!',
        image: 'assets/img/avatar-gollum.jpg',
        items: [
          {title: 'Race', note: 'Hobbit'},
          {title: 'Culture', note: 'River Folk'},
          {title: 'Alter Ego', note: 'Smeagol'}
        ]
      },
      {
        name: 'Frodo',
        quote: 'Go back, Sam! I\'m going to Mordor alone!',
        image: 'assets/img/avatar-frodo.jpg',
        items: [
          {title: 'Race', note: 'Hobbit'},
          {title: 'Culture', note: 'Shire Folk'},
          {title: 'Weapon', note: 'Sting'}
        ]
      },
      {
        name: 'Samwise Gamgee',
        quote: 'What we need is a few good taters.',
        image: 'assets/img/avatar-samwise.jpg',
        items: [
          {title: 'Race', note: 'Hobbit'},
          {title: 'Culture', note: 'Shire Folk'},
          {title: 'Nickname', note: 'Sam'}
        ]
      }
    ];
    this.character = characters[this.params.get('charNum')];
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
