/* Framework imports -------------------------------------------------------- */
import { createSlice } from '@reduxjs/toolkit'

/* Type imports ------------------------------------------------------------- */
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from 'store/store'

export interface SavedMaker {
  imageBase64: string;
  link: string;
  name: string;
  id: number;
}

export interface Maker {
  savedMakers: SavedMaker[];
}

/* Redux slice -------------------------------------------------------------- */
const makerSlice = createSlice(
  {
    name: 'maker',
    initialState: {
      savedMakers: [],
    } as Maker,
    reducers: {
      setSavedMakers: (state, { payload }: PayloadAction<SavedMaker[]>) => {
        state.savedMakers = payload
      },
    },
  },
)

/* Export slice components -------------------------------------------------- */
export const { setSavedMakers } = makerSlice.actions

export default makerSlice.reducer

export const selectSavedMakers = (state: RootState): SavedMaker[] => {
  return state.maker.savedMakers
}
