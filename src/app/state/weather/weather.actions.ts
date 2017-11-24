import { Action }               from '@ngrx/store';
import { IWeatherItem }         from './weather.model';

export const GET_DATA           = 'Get weather info';
export const GET_DATA_SUCCESS   = 'Weather info retreived!';
export const GET_DATA_FAIL      = 'Fail to retreive weather info';


export class GetData implements Action {
  readonly type = GET_DATA;
  constructor(public payload: any) {}
}

export class GetDataSuccess implements Action {
  readonly type = GET_DATA_SUCCESS;
  constructor(public payload?: IWeatherItem[]) {}
}

export class GetDataFail implements Action {
  readonly type = GET_DATA_FAIL;
  constructor(public payload?: any) {}
}

export type All
  = GetData
  | GetDataSuccess
  | GetDataFail;
