import { combineReducers } from 'redux'
import loginReducer from './login-reducer'
import adminReducer from './admin-reducer'
import searchReducer from './search-reducer'

const reducers = {
    loginStore: loginReducer,
    adminStore: adminReducer,
    searchStore: searchReducer
}

const rootReducer = combineReducers(reducers)

export default rootReducer
