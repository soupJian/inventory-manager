import { configureStore } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import rootReducer from './rootReducer'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  timeout: 500,
  key: 'root',
  storage,
  blacklist: ['global']
}

const reducer = (state, action) => {
  return rootReducer(state, action)
}

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
})
