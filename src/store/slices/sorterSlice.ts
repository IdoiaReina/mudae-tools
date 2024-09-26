/* Framework imports -------------------------------------------------------- */
import { createSlice } from '@reduxjs/toolkit'

/* Type imports ------------------------------------------------------------- */
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from 'store/store'
import type { Waifu } from 'types/Waifu'

export interface Sorter {
  savedWaifus: Waifu[];
}

/* Redux slice -------------------------------------------------------------- */
const sorterSlice = createSlice(
  {
    name: 'sorter',
    initialState: {
      savedWaifus: [],
    } as Sorter,
    reducers: {
      setSavedWaifus: (state, { payload }: PayloadAction<Waifu[]>) => {
        state.savedWaifus = payload
      },
    },
  },
)

/* Export slice components -------------------------------------------------- */
export const { setSavedWaifus } = sorterSlice.actions

export default sorterSlice.reducer

export const selectSavedWaifus = (state: RootState): Waifu[] => {
  return state.sorter.savedWaifus
}
