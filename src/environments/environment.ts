// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { IWebEnvironment } from '../app/shared/models/environment';

export const environment: IWebEnvironment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyCQwArucAhP231eB4l8_3Q2zymuEY7MUfc",
    authDomain: "xlear-app.firebaseapp.com",
    databaseURL: "https://xlear-app.firebaseio.com",
    projectId: "xlear-app",
    storageBucket: "xlear-app.appspot.com",
    messagingSenderId: "916397712202",
    appId: "1:916397712202:web:2ee0dcd6aa76c482a017b3",
    measurementId: "G-QLDBGDSL2V"
  },
  apiUrl: 'http://localhost:8080',
  timeout: 100
}


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
