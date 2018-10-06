import { combineReducers } from 'redux'
import loginReducer from './login-reducer'

const reducers = {
    loginStore: loginReducer
}

const rootReducer = combineReducers(reducers)

export default rootReducer
