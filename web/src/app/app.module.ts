import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ChartModule } from '@progress/kendo-angular-charts';
import { AngularFireModule } from 'angularfire2';
import 'hammerjs';

import { AppRouting } from './app.routing';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';


export const firebaseConfig = {
   apiKey: "AIzaSyCVe0RQwBocNDOpUfDQfZf6Kh1E0-zcZxI",
   authDomain: "emoting-b4d9a.firebaseapp.com",
   databaseURL: "https://emoting-b4d9a.firebaseio.com",
   storageBucket: "emoting-b4d9a.appspot.com",
   messagingSenderId: "229031146500"
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRouting,
    FormsModule,
    HttpModule,
    ChartModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

