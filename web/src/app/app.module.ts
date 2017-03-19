import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AngularFireModule } from 'angularfire2';

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
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

