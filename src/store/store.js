import { configureStore } from "@reduxjs/toolkit";
import { persistReducer} from "redux-persist"
import rootReducer from "./rootReducer";
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    timeout: 500,
    key: 'root',
    storage,
  }

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>  getDefaultMiddleware({ serializableCheck: false})
})