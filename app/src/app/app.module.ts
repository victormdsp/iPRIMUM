import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RequestService } from './services/request.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot({mode: 'md'}),
    AppRoutingModule,
    HttpClientModule,
  ],
  providers:[
    {provide: RouteReuseStrategy,
     useClass: IonicRouteStrategy},
    RequestService,
    BarcodeScanner,
],

bootstrap:
  [AppComponent],
})
export class AppModule {}
