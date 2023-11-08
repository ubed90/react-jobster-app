import axios from 'axios'
import { getUserFromLocalStorage } from './localStorage'
import { GetThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk'
import { AsyncThunkConfig } from '../Store'
import { clearStore } from '../features/user'

const customFetch = axios.create({
  baseURL: 'https://jobster-app-d69q.onrender.com/api/v1',
})

customFetch.interceptors.request.use(
  (config) => {
    const user = getUserFromLocalStorage()
    if (user) {
      config.headers['Authorization'] = `Bearer ${user.token}`
    }
    return config
  },
  (error) => {
    console.log(error)
  }
)

export const checkForUnauthorizedResponse = (
  error: any,
  thunkApi: GetThunkAPI<AsyncThunkConfig>
) => {
  if (error.response.status === 401) {
    thunkApi.dispatch(clearStore(''))
    return thunkApi.rejectWithValue('Unauthorized! Logging Out...')
  }
  return thunkApi.rejectWithValue(error.response.data.msg)
}

export default customFetch
