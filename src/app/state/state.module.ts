import { NgModule }                  from '@angular/core';
import { HttpClientModule }          from '@angular/common/http';

import { EffectsModule }             from '@ngrx/effects';
import { StoreModule }               from '@ngrx/store';
import { StoreDevtoolsModule }       from '@ngrx/store-devtools';

// *************************
// Custom Application imports
// *************************

import { weatherReducer }            from './weather/weather.reducer';
import { WeatherService }            from './weather/weather.service';

@NgModule({
  imports: [
    EffectsModule.forRoot([
      WeatherService
    ]),
    HttpClientModule,
    // Signature matches AppState interface
    StoreModule.forRoot({
      weather: weatherReducer
    }),

    StoreDevtoolsModule.instrument({ maxAge: 25 })
  ],
  providers: [
      WeatherService
  ],
})
export class AppStateModule { }
