import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { store } from '../../store/store'
import { PersistGate } from 'redux-persist/integration/react'
import Loading from '../loading'

const MainStateProvider = ({ children }) => {
  let persistedStore = persistStore(store, {}, function () {
    persistedStore.persist()
  })

  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistedStore}>
        {children}
      </PersistGate>
    </Provider>
  )
}

export default MainStateProvider
