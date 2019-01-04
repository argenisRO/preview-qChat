import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import logger from 'redux-logger'
import SocketMiddleware from './middleware/SocketMiddleware'

export default createStore(
    rootReducer,
    applyMiddleware(
        thunk,
        logger,
        SocketMiddleware({
            defaultEndpoint: 'ws://localhost:8000/api',
        })
    )
)
