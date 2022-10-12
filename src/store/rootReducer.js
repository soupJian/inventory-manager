import { combineReducers } from 'redux'
import userReducer from './slices/userSlice'
import globalReducer from './slices/globalSlice'

const rootReducer = combineReducers({
  user: userReducer,
  global: globalReducer
})

export default rootReducer
