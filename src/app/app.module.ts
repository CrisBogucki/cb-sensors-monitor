import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {environment} from "../environments/environment";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import { HomeComponent } from './@views/home/home.component';
import { DetailsDayComponent } from './@views/details-day/details-day.component';
import { DetailsWeekComponent } from './@views/details-week/details-week.component';
import { DetailsMonthComponent } from './@views/details-month/details-month.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetailsDayComponent,
    DetailsWeekComponent,
    DetailsMonthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
