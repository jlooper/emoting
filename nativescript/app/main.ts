// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from "nativescript-angular/platform";

import { AppModule } from "./app.module";
import firebase = require("nativescript-plugin-firebase");

 firebase.init({
   //persist should be set to false as otherwise numbers aren't returned during livesync
   persist: false,
   storageBucket: 'gs://emoting-b4d9a.appspot.com'
  
 }).then(
     function (instance) {
       console.log("firebase.init done");
     },
     function (error) {
       console.log("firebase.init error: " + error);
     }
 );

platformNativeScriptDynamic().bootstrapModule(AppModule);