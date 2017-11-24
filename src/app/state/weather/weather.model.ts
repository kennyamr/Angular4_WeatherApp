export interface IWeather {
  weatherGroups: IWeatherGroup[];
  loading: boolean;
  error?: string;
}

export interface IWeatherGroup {
  weatherItems: IWeatherItem[];
  timestamp: Date;
}

export interface IWeatherItem {
  id: number;
  name: string;
  info: string;
  temp: number;
  maxTemp: number;
  minTemp: number;
  clouds: number;
  humidity: number;
  icon: string;
}

export class Weather {
    constructor(public weatherGroups: IWeatherGroup[], public loading: boolean) {}
}
