import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import {WelcomePageModule} from '../pages/welcome/welcome.module'
import {LoginPageModule} from '../pages/login/login.module'

import {ClientsPageModule} from '../pages/clients/clients.module'
import {InventoryPageModule} from '../pages/inventory/inventory.module'
import {ProformaPageModule} from '../pages/proforma/proforma.module'
import {ModalContentPage} from '../pages/proforma/proforma'
import {ProductsModal} from '../pages/proforma/proforma'
import {ProductDetailModal} from '../pages/proforma/proforma'
import {GpsPageModule} from '../pages/gps/gps.module'
import {OrdersPageModule} from '../pages/orders/orders.module'
import {EditOrderPageModule} from '../pages/edit-order/edit-order.module'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {HttpClientModule} from '@angular/common/http'
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { ClientServiceProvider } from '../providers/client-service/client-service';
import { InventoryServiceProvider } from '../providers/inventory-service/inventory-service';
import { GpstrackingServiceProvider } from '../providers/gpstracking-service/gpstracking-service';
import { ProformaServiceProvider } from '../providers/proforma-service/proforma-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    ModalContentPage,
    ProductsModal,
    ProductDetailModal
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    LoginPageModule,
    WelcomePageModule,
    ClientsPageModule,
    InventoryPageModule,
    ProformaPageModule,
    GpsPageModule,
    OrdersPageModule,
    EditOrderPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    ModalContentPage,
    ProductsModal,
    ProductDetailModal
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BackgroundGeolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    ClientServiceProvider,
    InventoryServiceProvider,
    GpstrackingServiceProvider,
    ProformaServiceProvider
  ]
})
export class AppModule {}
