/* Framework imports -------------------------------------------------------- */

/* Module imports ----------------------------------------------------------- */
import * as RTK from '@reduxjs/toolkit'
import * as RTKQuery from '@reduxjs/toolkit/query'
import {
  persistStore,
  persistReducer,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

/* Redux slice imports ------------------------------------------------------ */
import themeSlice from './slices/themeSlice'
import sorterSlice from './slices/sorterSlice'
import pickerSlice from './slices/pickerSlice'

/* Store configuration ------------------------------------------------------ */
const appReducer = RTK.combineReducers({
  theme: themeSlice,
  sorter: sorterSlice,
  picker: pickerSlice,
})

const rootReducer = (state: ReturnType<typeof appReducer> | undefined, action: RTK.PayloadAction) => {
  if (action.type === 'auth/resetAuth') {
    return appReducer(undefined, action)
  }

  return appReducer(state, action)
}

const persistConfig = {
  key: 'mudae_tools',
  storage: storage,
  whitelist: [ 'auth', 'theme' ], // which reducer want to store
}

const pReducer = persistReducer(persistConfig, rootReducer)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>

export const store = RTK.configureStore({
  reducer: pReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false })
  },
})

export type AppDispatch = typeof store.dispatch

/* Add store to the window */
export const persistor = persistStore(store)

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
RTKQuery.setupListeners(store.dispatch)
