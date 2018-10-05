import {Component} from '@angular/core';
import {NavController, App} from 'ionic-angular';
import {
  BackgroundGeolocation,
  BackgroundGeolocationConfig,
  BackgroundGeolocationResponse
} from '@ionic-native/background-geolocation';

import {API_ENDPOINT} from '../../providers/constants';
import {GpstrackingServiceProvider} from '../../providers/gpstracking-service/gpstracking-service'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  logs: string[] = [];
  user: any;

  constructor(public navCtrl: NavController,
              private backgroundGeolocation: BackgroundGeolocation,
              public app: App,
              public gpsTrackingService: GpstrackingServiceProvider) {
    this.user = localStorage.getItem('usr')
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  startBackgroundGeolocation() {
    this.backgroundGeolocation.isLocationEnabled()
      .then((rta) => {
        if (rta) {
          this.start();
        } else {
          this.backgroundGeolocation.showLocationSettings();
        }
      })
  }

  start() {

    const config: BackgroundGeolocationConfig = {
      desiredAccuracy: 10,
      stationaryRadius: 1,
      distanceFilter: 1,
      debug: true,
      stopOnTerminate: false,
      // Android only section
      locationProvider: 1,
      startForeground: true,
      interval: 6000,
      fastestInterval: 5000,
      activitiesInterval: 10000,
      ///
      url:API_ENDPOINT + '/gpsTracking/sellers',
      httpHeaders:{
        'test':'test'
      }
    };

    console.log('start');

    this.backgroundGeolocation
      .configure(config)
      .subscribe((location: BackgroundGeolocationResponse) => {
      });

    // start recording location
    this.backgroundGeolocation.start();
  }

  stopBackgroundGeolocation() {
    alert('STOP')
    this.backgroundGeolocation.stop();
  }

  logout() {
    // Api token
    // const  root = this.app.getRootNavById();
    // root.popToRoot();
  }
}
