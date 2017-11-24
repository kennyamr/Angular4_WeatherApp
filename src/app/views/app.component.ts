import { Component }      from '@angular/core';
import { Observable }     from 'rxjs/Observable';
import { Store }          from '@ngrx/store';

import { IWeather }       from '../state/weather/weather.model';
import { WeatherService } from '../state/weather/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  weather$: Store<IWeather> = this.weatherService.weather$;
  weatherIndex = 0;
  weatherHistory = true; // Switch for history feature
  
  constructor(private weatherService: WeatherService) {}
}
