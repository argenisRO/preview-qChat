import { AUTH_START, AUTH_UPDATE, AUTH_END, AUTH_FAIL } from '../actions'

const initialState = {
    authenticated: localStorage.token !== undefined,
    token: localStorage.token,
    auth_load: false,
    error: null,
}

export default function(state = initialState, action) {
    switch (action.type) {
        case AUTH_START:
            return {
                ...state,
                auth_load: true,
            }
        case AUTH_UPDATE:
            return {
                ...state,
                authenticated: localStorage.token !== undefined,
                token: action.payload,
            }
        case AUTH_END:
            return {
                ...state,
                auth_load: false,
            }
        case AUTH_FAIL:
            return {
                ...state,
                error: action.payload,
            }
        default:
            return state
    }
}
