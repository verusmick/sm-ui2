import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {
  BackgroundGeolocation,
  BackgroundGeolocationConfig,
  BackgroundGeolocationResponse
} from '@ionic-native/background-geolocation';

import {API_ENDPOINT} from '../../providers/constants';
import {GpstrackingServiceProvider} from '../../providers/gpstracking-service/gpstracking-service'

/**
 * Generated class for the GpsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gps',
  templateUrl: 'gps.html',
})
export class GpsPage {
  logs: string[] = [];
  user: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private backgroundGeolocation: BackgroundGeolocation,
              public gpsTrackingService: GpstrackingServiceProvider) {
    this.user = localStorage.getItem('usr')
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
      debug: false,
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
        'userId':JSON.parse(localStorage.getItem('usr')).ci
      }
    };

    console.log('start');

    this.backgroundGeolocation
      .configure(config)
      .subscribe((location: BackgroundGeolocationResponse) => {
      });

    this.gpsTrackingService.setGpsStatus('on', JSON.parse(localStorage.getItem('usr')).ci);
    // start recording location
    this.backgroundGeolocation.start();

  }
  stopBackgroundGeolocation() {
    alert('STOP')
    this.gpsTrackingService.setGpsStatus('off', JSON.parse(localStorage.getItem('usr')).ci);
    this.backgroundGeolocation.stop();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad GpsPage');
  }

}
