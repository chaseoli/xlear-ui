import { IWebEnvironment } from '../app/shared/models/environment'

export const environment: IWebEnvironment = {
  production: true,
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
  apiUrl: 'https://xlear-app.uc.r.appspot.com', 
  timeout: 100,
}
