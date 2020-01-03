import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Events} from 'ionic-angular';

import {LoginPage} from '../pages/login/login';
import {HomePage} from '../pages/home/home';
import {GpsPage} from '../pages/gps/gps';
import {InventoryPage} from '../pages/inventory/inventory';
// import {ListPage} from '../pages/list/list';
import {ClientsPage} from '../pages/clients/clients';
import {DebtClientPage} from '../pages/debt-client/debt-client';
import {ProformaPage} from '../pages/proforma/proforma';
import {OrdersPage} from '../pages/orders/orders';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public events: Events) {
    // used for an example of ngFor and navigation
    this.events.subscribe('setMenu', () => {
      this.setPages()
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }


  setPages() {
    let resources = JSON.parse(localStorage.getItem('usr')).resources;
    let items = [
      {title: 'Home', component: HomePage, resourceCode: 'app_Track'},
      {title: 'GPS', component: GpsPage, resourceCode: 'app_Track'},

      {title: 'Lista de Clientes', component: ClientsPage, resourceCode: 'app_clients'},
      {title: 'Clientes con Deuda', component: DebtClientPage, resourceCode: 'app_clients'},

      {title: 'Productos', component: InventoryPage, resourceCode: 'app_products'},
      // {title: 'Lists', component: ListPage, resourceCode: 'app_order'},
      {title: 'Crear Proforma', component: ProformaPage, resourceCode: 'app_order'},
      {title: 'Lista de Proformas', component: OrdersPage, resourceCode: 'app_order'}
    ];
    let itemsWithPermissions = [];
    for (let i = 0; i < items.length; i++) {
      if(resources.indexOf(items[i].resourceCode) !=-1){
        itemsWithPermissions.push(items[i]);
      }
    }
    this.pages = itemsWithPermissions;
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
