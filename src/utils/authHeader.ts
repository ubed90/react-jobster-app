import { GetThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk'
import { AsyncThunkConfig, RootState } from '../Store'

const authHeader = (thunkAPI: GetThunkAPI<AsyncThunkConfig>) => {
  return {
    headers: {
      Authorization: `Bearer ${
        (thunkAPI.getState() as RootState).user.user?.token
      }`,
    },
  }
}

export default authHeader
