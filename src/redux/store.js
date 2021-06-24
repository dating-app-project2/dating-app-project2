import {createStore, combineReducers} from 'redux'
import authReducer from './authReducer'
import matchReducer from './matchReducer'


const rootReducer = combineReducers({
  auth: authReducer,
  match: matchReducer
})

export default createStore(rootReducer)