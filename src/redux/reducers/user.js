import { LOGIN_USER, LOGOUT_USER } from "../actions/types";

import { retrieveAccessToken } from "../../configs/localStorage";

const initialState = {
    username: retrieveAccessToken().username,
    token: retrieveAccessToken().token,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                username: action.payload.username,
                token: action.payload.token,
            };
        case LOGOUT_USER:
            return {
                ...state,
                username: null,
                token: null,
            };
        default:
            return state;
    }
}
