import { Injectable }                 from '@angular/core';
import { HttpClient, HttpParams  }    from '@angular/common/http';
import { Store }                      from '@ngrx/store';
import { Effect, Actions }            from '@ngrx/effects';

import { Observable }                 from 'rxjs/Observable';
import { of }                         from 'rxjs/observable/of';
import { defer }                      from 'rxjs/observable/defer';
import { timer }                      from 'rxjs/observable/timer';
import '../../utils/rxjs.operators';

import { environment }                from '../../../environments/environment';
import { IAppState }                  from '../state';
import { IWeatherItem }               from './weather.model';
import { WeatherQuery }               from './weather.reducer';

import * as weatherActions            from './weather.actions';
type Action = weatherActions.All;


@Injectable()
export class WeatherService {

  // ************************************************
  // Observable Queries available for consumption by views
  // ************************************************

  weather$ = this.store.select(WeatherQuery.getWeather);

  @Effect()
  getData$: Observable<Action> = this.actions$.ofType(weatherActions.GET_DATA)
    .map((action: weatherActions.GetData) => action.payload )
    .switchMap((payload) => this.http.get(this.apiRoot, { params: new HttpParams().set('id', payload.join(',')) })
      .map((data: any) => {
        return new weatherActions.GetDataSuccess(data.list.map((item) => {
          return <IWeatherItem>{
          'id': item.id,
          'name': item.name,
          'info': item.weather[0].description,
          'temp': item.main.temp.toFixed(1),
          'minTemp': item.main.temp_min.toFixed(1),
          'maxTemp': item.main.temp_max.toFixed(1),
          'clouds': item.clouds.all,
          'humidity': item.main.humidity,
          'icon': item.weather[0].icon,
          'loading': false
          };
        }));
      })
      .catch(err => of (new weatherActions.GetDataFail( { error: err } )) )
    );
      
     
  @Effect({dispatch: false})
  init$: Observable<Action> = defer(() => {
    Observable.timer(0, 3 * 60 * 1000)
              .do(() => this.store.dispatch(new weatherActions.GetData(this.cityIds)))
              .subscribe();
  });
  
  
  // ************************************************
  // Internal Code
  // ************************************************
  private apiRoot: string = environment.weatherAPI.url;
  private cityIds: number[] = [
    3871336,  // Santiago
    3435910,  // Buenos Aires
    3936456,  // Lima
    3448439   // Sao Paulo
  ];

  constructor(
    private actions$: Actions,
    private store: Store<IAppState>,
    private http: HttpClient
  ) {}

}
