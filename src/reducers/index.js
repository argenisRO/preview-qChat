import { combineReducers } from 'redux'
import authenticationReducer from './authenticationReducer'
import localsReducer from './localsReducer'

export default combineReducers({
    authentication: authenticationReducer,
    locals: localsReducer,
})
