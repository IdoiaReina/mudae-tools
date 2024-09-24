/* Framework imports -------------------------------------------------------- */
import { createSlice } from '@reduxjs/toolkit'

/* Type imports ------------------------------------------------------------- */
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from 'store/store'
import type { PaletteMode } from '@mui/material'

export interface Theme {
  mode: PaletteMode;
}

/* Redux slice -------------------------------------------------------------- */
const themeSlice = createSlice(
  {
    name: 'theme',
    initialState: {
      mode: window.matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light',
    } as Theme,
    reducers: {
      setThemeMode: (state, { payload }: PayloadAction<PaletteMode>) => {
        state.mode = payload
      },
      toggleThemeMode: (state) => {
        state.mode = state.mode === 'light' ? 'dark' : 'light'
      },
    },
  },
)

/* Export slice components -------------------------------------------------- */
export const {
  setThemeMode,
  toggleThemeMode,
} = themeSlice.actions

export default themeSlice.reducer

export const selectTheme = (state: RootState): Theme => {
  return state.theme
}
