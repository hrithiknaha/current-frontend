import { LOGIN_USER, LOGOUT_USER } from "../actions/types";

import { retrieveAccessToken } from "../../configs/localStorage";

const initialState = {
    isAuthenticated: Boolean(retrieveAccessToken()?.token),
    username: retrieveAccessToken().username,
    token: retrieveAccessToken().token,
    exp: retrieveAccessToken().exp,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                isAuthenticated: true,
                username: action.payload.username,
                token: action.payload.token,
                exp: action.payload.exp,
            };
        case LOGOUT_USER:
            return {
                ...state,
                isAuthenticated: false,
                username: null,
                token: null,
                exp: null,
            };
        default:
            return state;
    }
}
