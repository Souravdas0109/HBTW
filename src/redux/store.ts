import { createStore, combineReducers, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import loginReducer from './Reducers/loginReducer'
import manageGroupReducer from './Reducers/manageGroupReducer'
import manageUserReducer from './Reducers/manageUserReducer'
import pendingActionReducer from './Reducers/pendingActionReducer'

const reducer = combineReducers({
  loginReducer: loginReducer,
  manageUserReducer: manageUserReducer,
  manageGroupReducer: manageGroupReducer,
  pendingActionReducer: pendingActionReducer,
})

const store = createStore(reducer, applyMiddleware(logger, thunk))

export default store
