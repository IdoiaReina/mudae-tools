/* Framework imports -------------------------------------------------------- */
import { createSlice } from '@reduxjs/toolkit'

/* Type imports ------------------------------------------------------------- */
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from 'store/store'
import type { WaifuImage } from 'types/Waifu'

export interface SavedPicker {
  index: number;
  images: WaifuImage[];
  name: string;
}

export interface Picker {
  savedPickers: SavedPicker[];
}

/* Redux slice -------------------------------------------------------------- */
const pickerSlice = createSlice(
  {
    name: 'picker',
    initialState: {
      savedPickers: [],
    } as Picker,
    reducers: {
      setSavedPickers: (state, { payload }: PayloadAction<SavedPicker[]>) => {
        state.savedPickers = payload
      },
    },
  },
)

/* Export slice components -------------------------------------------------- */
export const { setSavedPickers } = pickerSlice.actions

export default pickerSlice.reducer

export const selectSavedPickers = (state: RootState): SavedPicker[] => {
  return state.picker.savedPickers
}
