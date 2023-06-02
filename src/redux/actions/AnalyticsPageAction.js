import * as actionType from './actionTypes';

export const AnalyticsData = payload => {
    return {
        type: actionType.ANALYTICS_DATA,
        payload: payload,
    };
};
