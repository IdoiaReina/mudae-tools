/* Framework imports -------------------------------------------------------- */
import { useMemo } from 'react'
import * as Redux from 'react-redux'

/* Module imports ----------------------------------------------------------- */
import {
  persistor,
  store,
} from 'store/store'

/* Type imports ------------------------------------------------------------- */
import type {
  RootState,
  AppDispatch,
} from 'store/store'

/* Generic Redux store hooks ------------------------------------------------ */
export const useAppDispatch: () => AppDispatch = Redux.useDispatch
export const useAppSelector: Redux.TypedUseSelectorHook<RootState> = Redux.useSelector

/* Specific Redux store hooks ----------------------------------------------- */
