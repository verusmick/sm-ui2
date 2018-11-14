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
  proformaData = {
    client: {razon_social: '', label: ''},
    items: [],
    nit: '',
    billName: '',
    payType: null,
    total: null
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public proformaService: ProformaServiceProvider) {
  }

  openSearchClientModal(characterNum) {
    let searchClientmodal = this.modalCtrl.create(ModalContentPage, characterNum);
    searchClientmodal.present();
    searchClientmodal.onDidDismiss(clientSelected => {
      if (!clientSelected) {return false}
      clientSelected['label'] = clientSelected.tipo.toLowerCase() + ' ' + clientSelected.razon_social.toLowerCase();
      this.proformaData.client = clientSelected
    });
  }

  addProductBtn() {
    let productsModal = this.modalCtrl.create(ProductsModal);
    productsModal.present();
    productsModal.onDidDismiss(product => {
      if (product) {
        product['detail'] =  {price: null, quantity: null, total: 0};
        this.proformaData.items.push(product)
        this.detailProductBtn(product, this.proformaData.items.length - 1)

      }
    });
  }

  removeProductBtm(index) {
    this.proformaData.items.splice(index, 1)
    this.calculateTotal();
  }

  detailProductBtn(product, index) {
    let productDetailModal = this.modalCtrl.create(ProductDetailModal, {prod: product, index: index});
    productDetailModal.present();
    productDetailModal.onDidDismiss((productDetail, index) => {
      if(!productDetail){
        this.removeProductBtm(index);
      }else if (productDetail) {
        this.proformaData.items[index]['detail'] = productDetail;
        this.calculateTotal();
      }
    });
  }

  calculateTotal() {
    let total = 0;
    for (let i = 0; i < this.proformaData.items.length; i++) {
      total = this.proformaData.items[i].detail.total + total;
    }
    this.proformaData.total = total;
  }

  parseItems(items) {
    let itemsList = [];
    for (let i = 0; i < items.length; i++) {
      itemsList.push({
        productId: items[i].id_producto_venta,
        price: items[i].detail.price,
        quantity: items[i].detail.quantity,
        subTotal: items[i].detail.total
      })
    }
    return itemsList;
  }

  parseProforma(proformObj) {
    return {
      clientId: proformObj.client.id_cliente,
      nit: proformObj.nit,
      payType: proformObj.payType,
      billName: proformObj.billName,
      items: this.parseItems(proformObj.items),
      total: proformObj.total
    }
  }

  saveProforma() {
    this.proformaService.saveProforma(this.parseProforma(this.proformaData));
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
  detail: any;
  product: any;
  referencialPrice: any;

  constructor(public platform: Platform,
              public params: NavParams,
              public viewCtrl: ViewController,) {
    this.product = this.params.get('prod')
    this.detail = this.product.detail
  }

  selectPrice() {
    if (this.referencialPrice) {
      this.detail['price'] = this.product[this.referencialPrice]
      this.calculateTotal();
    }
  }

  calculateTotal() {
    let total = parseFloat(this.detail['price']) * parseFloat(this.detail.quantity);
    this.detail.total = total || 0;
  }

  saveDetail() {
    this.detail.quantity = parseFloat(this.detail.quantity)
    this.dismiss(this.detail);
  }

  dismiss(obj) {
    this.viewCtrl.dismiss(obj, this.params.get('index'));
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

  setFilteredProducts() {
    this.proformaService.getProducts(this.searchTerm).then(data => {
      this.items = data;
    })
  }

  selectProduct(product) {
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
