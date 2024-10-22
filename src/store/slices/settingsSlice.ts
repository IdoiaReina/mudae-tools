/* Framework imports -------------------------------------------------------- */
import { createSlice } from '@reduxjs/toolkit'

/* Type imports ------------------------------------------------------------- */
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from 'store/store'

export interface Settings {
  sorterZoomLevel: number;
  pickerZoomLevel: number;
  sorterDisplayName: boolean;
}

/* Redux slice -------------------------------------------------------------- */
const settingsSlice = createSlice(
  {
    name: 'settings',
    initialState: {
      sorterZoomLevel: 1,
      pickerZoomLevel: 1,
      sorterDisplayName: false,
    } as Settings,
    reducers: {
      setSorterZoomLevel: (state, { payload }: PayloadAction<number>) => {
        state.sorterZoomLevel = payload
      },
      setPickerZoomLevel: (state, { payload }: PayloadAction<number>) => {
        state.pickerZoomLevel = payload
      },
      setSorterDisplayName: (state, { payload }: PayloadAction<boolean>) => {
        state.sorterDisplayName = payload
      },
    },
  },
)

/* Export slice components -------------------------------------------------- */
export const { setSorterZoomLevel, setPickerZoomLevel, setSorterDisplayName } = settingsSlice.actions

export default settingsSlice.reducer

export const selectSorterZoomLevel = (state: RootState): number => {
  return state.settings.sorterZoomLevel
}

export const selectPickerZoomLevel = (state: RootState): number => {
  return state.settings.pickerZoomLevel
}

export const selectSorterDisplayName = (state: RootState): boolean => {
  return state.settings.sorterDisplayName
}
