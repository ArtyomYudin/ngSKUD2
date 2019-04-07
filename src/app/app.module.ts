import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';

import { UiModule } from '@modules/ui/ui.module';
import { WebsocketService } from '@services/websocket.service';
import { RouteReuseStrategy } from '@angular/router';
import { CustomReuseStrategy } from './custom-reuse-strategy';

export function jwtTokenGetter() {
  if (localStorage.getItem('ngSKUD')) {
    return JSON.parse(localStorage.getItem('ngSKUD')).token ;
  }
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: jwtTokenGetter,
        // whitelistedDomains: ['localhost:3001', 'localhost:4200'],
       //  blacklistedRoutes: ['http://localhost:3000/api/auth'],
      },
    }),
    AppRoutingModule,
    JwtModule,
    UiModule,
  ],
  providers: [WebsocketService, {provide: RouteReuseStrategy, useClass: CustomReuseStrategy}],
  bootstrap: [AppComponent],
})
export class AppModule { }
