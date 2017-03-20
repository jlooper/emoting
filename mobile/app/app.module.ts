import { NativeScriptModule } from "nativescript-angular/platform";
import { NgModule } from "@angular/core";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { appRoutes } from "./app.routes";
import { AppComponent } from "./app.component";
import { FirebaseService } from "./services/firebase.service";
import { UtilsService } from "./services/utils.service";

import { HomeModule } from "./home/home.module";

@NgModule({
  providers: [
    FirebaseService,
    UtilsService
  ],
  imports: [
    NativeScriptModule,
    NativeScriptHttpModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forRoot(appRoutes),
    HomeModule
  ],
  declarations: [
      AppComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
