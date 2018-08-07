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

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {HttpClientModule} from '@angular/common/http'
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { ClientServiceProvider } from '../providers/client-service/client-service';
import { InventoryServiceProvider } from '../providers/inventory-service/inventory-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    LoginPageModule,
    WelcomePageModule,
    ClientsPageModule,
    InventoryPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BackgroundGeolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    ClientServiceProvider,
    InventoryServiceProvider
  ]
})
export class AppModule {}
