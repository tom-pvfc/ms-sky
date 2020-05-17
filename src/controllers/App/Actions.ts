import { APP_START } from '../../constants';

export const TYPES = {
    DATA_LOADED: APP_START | 0x00001
};

export const ACTIONS = {
    DATA_LOADED: (data: any, timeData: any) => ({
        data,
        timeData,
        type: TYPES.DATA_LOADED,
    })
};
