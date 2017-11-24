import { IAppState } from '../state';

import * as WeatherActions from './weather.actions';
import { IWeather, IWeatherGroup, Weather } from './weather.model';

export type Action = WeatherActions.All;

const defaultWeather = new Weather([], false);

/**
 * Define all store queries for Weather
 */
export namespace WeatherQuery {
  export const getWeather = (state: IAppState) => state.weather;
}

/// Reducer function
export function weatherReducer(state: IWeather = defaultWeather, action: Action) {

  switch (action.type) {

    case WeatherActions.GET_DATA:
      return { ...state, loading: true };

    case WeatherActions.GET_DATA_SUCCESS:
      const weatherGroups: IWeatherGroup[] = state.weatherGroups.map(x => Object.assign({}, x));
      weatherGroups.unshift({
        weatherItems: action.payload,
        timestamp: new Date()
      });
      
      return {weatherGroups: weatherGroups, loading: false };

    case WeatherActions.GET_DATA_FAIL:
      return { ...state, ...action.payload, loading: false };

    default:
      return state;

  }
}
