
import * as ReactRedux from 'react-redux';
import { iActionType, Dictionary, iData, iNavData, iTimeData } from '../../models/models';
export const STATE_KEY = 'app';

export interface AppProps extends ReactRedux.DispatchProp<any> {
	appState: AppState;
	loadData: (e, timeData) => iActionType;
}

export interface AppState {
	data: Dictionary<iData>;
	timeData: Dictionary<iTimeData>;
	navData: iNavData[];
}
export const AppInitState: AppState = {
	data: null,
	navData: null,
	timeData: null
}

export interface inAppState {
}

export const inAppInitialState: inAppState = {
}
