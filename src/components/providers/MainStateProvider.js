import { Provider } from "react-redux"
import { persistStore } from "redux-persist"
import { store } from "../../store/store"
import { PersistGate } from  "redux-persist/integration/react"
import LoadingScreen from "../loadingScreen/loadingScreen"

const MainStateProvider = ({children}) => {
    let persistedStore = persistStore(store,{}, function () {
        persistedStore.persist()
      });

    return (
        <Provider store={store}>
            <PersistGate loading={<LoadingScreen />} persistor={persistedStore}>
                {children}
            </PersistGate>
        </Provider>
    )
}

export default MainStateProvider
