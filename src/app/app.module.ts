import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthTokenComponent } from './secure/auth-token/auth-token.component';
import { AngularFireModule } from "@angular/fire";
import { environment } from "../environments/environment";
import { AuthModule } from './shared/modules/auth.module';
import { DocumentService } from './shared/services/document.service';
import { WindowService } from './shared/services/window.service';
import { SessionResolver } from './shared/guards/session.resolver';
import { LodashService } from './shared/services/lodash.service';
import { SessionService } from './shared/services/session.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AuthTokenComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule,
    AuthModule,
    BrowserAnimationsModule,
  ],
  providers: [SessionService, LodashService, SessionResolver, WindowService, DocumentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
