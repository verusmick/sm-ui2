import {Component} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController,
  Platform,
  ViewController
} from 'ionic-angular';

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
  proformaData = {client: {razon_social: '', label:''}, items:[]};
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController) {
  }

  openSearchClientModal(characterNum) {
    let searchClientmodal = this.modalCtrl.create(ModalContentPage, characterNum);
    searchClientmodal.present();
    searchClientmodal.onDidDismiss(clientSelected => {
      if(!clientSelected){return false}
      clientSelected['label'] =clientSelected.tipo.toLowerCase()+' '+clientSelected.razon_social.toLowerCase();
      this.proformaData.client = clientSelected
    });
  }

  addProductBtn() {
    let productsModal = this.modalCtrl.create(ProductsModal);
    productsModal.present();
    productsModal.onDidDismiss(product => {
      if(product){
        this.proformaData.items.push(product)
      }
    });
  }

  removeProductBtm(index) {
    this.proformaData.items.splice(index, 1)
  }

  detailProductBtn(product) {
    let productDetailModal = this.modalCtrl.create(ProductDetailModal, {prod: product});
    productDetailModal.present();
    productDetailModal.onDidDismiss(productDetail => {
      console.log('productDetail', {prod: productDetail});
    });
  }

  saveProforma(){
    console.log(this.proformaData);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
}

// Products modal
@Component({
  templateUrl: 'productDetail.modal.html'
})
export class ProductDetailModal {
  product: any;

  constructor(public platform: Platform,
              public params: NavParams,
              public viewCtrl: ViewController,) {
    console.log(this.params.get('prod'));
    this.product = this.params.get('prod')
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
  }
}


// Products modal
@Component({
  templateUrl: 'products.modal.html'
})
export class ProductsModal {

  items: any;
  searchTerm: string = '';
  searchControl: FormControl;

  constructor(public platform: Platform,
              public params: NavParams,
              public viewCtrl: ViewController,
              public proformaService: ProformaServiceProvider) {
    this.searchControl = new FormControl();
  }

  setFilteredProducts(){
    this.proformaService.getProducts(this.searchTerm).then(data => {
      this.items= data;
    })
  }

  selectProduct(product){
    this.dismiss(product)
  }

  dismiss(product) {
    this.viewCtrl.dismiss(product);
  }

  ionViewDidLoad() {
    this.setFilteredProducts();
    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
      this.setFilteredProducts();
    });
  }
}

// clients modal
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
