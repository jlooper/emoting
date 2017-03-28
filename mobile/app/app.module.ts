import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NgModule } from "@angular/core";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptAnimationsModule } from "nativescript-angular/animations";
import { AppRoutingModule } from "./app.routes";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";

import { FirebaseService } from "./services/firebase.service";
import { UtilsService } from "./services/utils.service";

import {registerElement} from 'nativescript-angular/element-registry';
registerElement("LottieView", () => require("nativescript-lottie").LottieView);


@NgModule({
  providers: [
    FirebaseService,
    UtilsService
  ],
  imports: [
    NativeScriptModule,
    AppRoutingModule,
    NativeScriptHttpModule,
    NativeScriptRouterModule,
    NativeScriptAnimationsModule
  ],
  declarations: [
      AppComponent,
      HomeComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
