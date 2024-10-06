/* Framework imports -------------------------------------------------------- */
import { createSlice } from '@reduxjs/toolkit'

/* Type imports ------------------------------------------------------------- */
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from 'store/store'

export interface Imgur {
  accessToken: string;
  refreshToken: string;
}

/* Redux slice -------------------------------------------------------------- */
const imgurSlice = createSlice(
  {
    name: 'imgur',
    initialState: {
      accessToken: '',
      refreshToken: '',
    } as Imgur,
    reducers: {
      setImgurTokens: (state, { payload }: PayloadAction<Imgur>) => {
        return payload
      },
      setImgurAccessToken: (state, { payload }: PayloadAction<string>) => {
        state.accessToken = payload
      },
      setImgurRefreshToken: (state, { payload }: PayloadAction<string>) => {
        state.refreshToken = payload
      },
    },
  },
)

/* Export slice components -------------------------------------------------- */
export const { setImgurTokens, setImgurAccessToken, setImgurRefreshToken } = imgurSlice.actions

export default imgurSlice.reducer

export const selectImgurToken = (state: RootState): Imgur => {
  return state.imgur
}
