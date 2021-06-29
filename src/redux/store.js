import {createStore, combineReducers} from 'redux'
import authReducer from './authReducer'
import matchReducer from './matchReducer'
import requestReducer from './requestReducer'


const rootReducer = combineReducers({
  auth: authReducer,
  match: matchReducer,
  request: requestReducer
})

export default createStore(rootReducer)