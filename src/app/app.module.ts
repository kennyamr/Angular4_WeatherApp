import { NgModule }                  from '@angular/core';
import { BrowserModule }             from '@angular/platform-browser';
import { HTTP_INTERCEPTORS }         from '@angular/common/http';

// *************************
// Custom Application imports
// *************************
import { WeatherAPIInterceptor }     from './interceptors/weatherAPI.interceptor';
import { CapitalizePipe }            from './pipes/capitalize.pipe';
import { AppRoutingModule }          from './app-routing.module';
import { AppStateModule }            from './state/state.module';

import { AppComponent }              from './views/app.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppStateModule,
  ],
  declarations: [ 
    CapitalizePipe,
    AppComponent 
  ],
  bootstrap: [ AppComponent ],
  providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: WeatherAPIInterceptor,
        multi: true,
    }]
})
export class AppModule { }
