import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {environment} from "../environments/environment";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './@views/home/home.component';
import {DetailsComponent} from "./@views/details/details.component";
import { ReversePipe } from './@utils/reverse.pipe';
import {ChartsModule} from "ng2-charts";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetailsComponent,
    ReversePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule, ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
