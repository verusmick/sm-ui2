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

        // let coordinates = {latitude: location.latitude, longitude: location.longitude};

        // this.gpsTrackingService.createCoordinate(coordinates).then(data => {
        //   console.log('exit');
        // });
        // this.logs.push(`${location.latitude},${location.longitude}`);
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

  test() {
    let coordinates = [
      { latitude: -16.4904492, longitude: -68.113885 },
      { latitude: -16.4904479, longitude: -68.1138907 },
      { latitude: -16.4904476, longitude: -68.1138919 },
      { latitude: -16.4904482, longitude: -68.1139103 },
      { latitude: -16.4904356, longitude: -68.113959 },
      { latitude: -16.4904056, longitude: -68.1139961 },
      { latitude: -16.4903563, longitude: -68.1140079 },
      { latitude: -16.490292, longitude: -68.1140354 },
      { latitude: -16.4902326, longitude: -68.1140593 },
      { latitude: -16.4901708, longitude: -68.114086 },
      { latitude: -16.490137, longitude: -68.1141193 },
      { latitude: -16.4901297, longitude: -68.1141791 },
      { latitude: -16.4901428, longitude: -68.1142289 },
      { latitude: -16.4901369, longitude: -68.1143429 },
      { latitude: -16.4901286, longitude: -68.114489 },
      { latitude: -16.4901078, longitude: -68.1145985 },
      { latitude: -16.4901036, longitude: -68.1146329 },
      { latitude: -16.4901075, longitude: -68.1146647 },
      { latitude: -16.4901265, longitude: -68.1147551 },
      { latitude: -16.4901434, longitude: -68.1147896 },
      { latitude: -16.4901458, longitude: -68.1148395 },
      { latitude: -16.4901354, longitude: -68.1149118 },
      { latitude: -16.4901097, longitude: -68.1149987 },
      { latitude: -16.490055, longitude: -68.1150391 },
      { latitude: -16.4899746, longitude: -68.1149789 }
    ];
    let i = 1;
    let intervalId = setInterval(() => {

      this.gpsTrackingService.createCoordinate(coordinates[i]).then(data => {
        console.log('exit');
      });
      i++;
    }, 3500);
  }
}
