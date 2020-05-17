import { TYPES } from './Actions';
import { AppInitState } from './StateAndProps';


export function Reducer(state = AppInitState, action): any {
	switch (action.type) {
		case TYPES.DATA_LOADED:
			state.data = action.data;
			state.timeData = action.timeData;
			state.navData = action.data.navData;
			return { ...state };
		default:
			return state;
	}
}
