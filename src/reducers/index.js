import { combineReducers } from 'redux'
import loginReducer from './login-reducer'
import adminReducer from './admin-reducer'

const reducers = {
    loginStore: loginReducer,
    adminStore: adminReducer
}

const rootReducer = combineReducers(reducers)

export default rootReducer
