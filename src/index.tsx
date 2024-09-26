/* Framework imports -------------------------------------------------------- */
import React from 'react'
import ReactDOM from 'react-dom/client'
import * as Redux from 'react-redux'

/* Module imports ----------------------------------------------------------- */
import CssBaseline from '@mui/material/CssBaseline'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { frFR } from '@mui/x-date-pickers/locales'
import { fr } from 'date-fns/locale'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { PersistGate } from 'redux-persist/integration/react'
import {
  persistor,
  store,
} from 'store/store'
import reportWebVitals from './reportWebVitals'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'

/* Component imports -------------------------------------------------------- */
import Theme from 'theme/Theme'
import App from './App/App'

/* Styling imports ------------------------------------- */
import 'react-toastify/dist/ReactToastify.css'
import './theme/index.css'

/* React startup --------------------------------------- */
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <Redux.Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <Theme>
            <LocalizationProvider
              adapterLocale={fr}
              dateAdapter={AdapterDateFns}
              localeText={frFR.components.MuiLocalizationProvider.defaultProps.localeText}
            >
              <CssBaseline />
              <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
              />
              <App />
            </LocalizationProvider>
          </Theme>
        </BrowserRouter>
      </PersistGate>
    </Redux.Provider>
  </React.StrictMode>,
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.info))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
