import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import {
  MatSliderModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatFormFieldModule,
  MatInputModule,
} from "@angular/material";


import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule,
    MatSliderModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatMomentDateModule,
    MatInputModule
  ],
  providers: [AngularFirestore,
         {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
