import { NativeScriptModule } from "nativescript-angular/platform";
import { NgModule } from "@angular/core";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { homeRouting } from "./home.routes";
import { HomeComponent } from "./home.component";

@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    homeRouting    
  ],
  declarations: [    
    HomeComponent,
  ]
})
export class HomeModule {}