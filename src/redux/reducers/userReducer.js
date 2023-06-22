import * as actionType from '../actions/actionTypes';
import { updateObject } from '../utility/utility';

const initialState = {
    isLoggedIn: false,
    name: '',
    role: [],
    Consumer: '',
};

const reducer = (state = initialState, action) => {
   
    switch (action.type) {
        case actionType.LOGIN_REQUEST:
            return updateObject(state, action.payload);

        default:
            return state;
    }
};

export default reducer;
