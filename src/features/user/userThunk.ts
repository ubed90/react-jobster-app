import { GetThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk'
import { User } from '../../model/user'
import { AsyncThunkConfig } from '../../Store'
import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios'
import { logoutUser } from '.'
import authHeader from '../../utils/authHeader'
import { clearAllJobsState } from '../jobs/allJobsSlice'
import { clearValues } from '../jobs/jobsCrudSlice'

export const clearStoreThunk = async (
  payload: string,
  thunkApi: GetThunkAPI<AsyncThunkConfig>
) => {
  try {
    // Logout User
    thunkApi.dispatch(logoutUser(payload))
    // Clear All Jobs
    thunkApi.dispatch(clearAllJobsState())
    // Clear Values From Job
    thunkApi.dispatch(clearValues())

    return Promise.resolve()
  } catch (error) {
    return Promise.reject()
  }
}

export const registerUserThunk = async (
  url: string,
  payload: { name: string; email: string; password: string },
  thunkApi: GetThunkAPI<AsyncThunkConfig>
) => {
  try {
    const {
      data: { user },
    } = await customFetch.post<{ user: User }>(url, payload)
    return user
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.response.data.msg)
  }
}

export const loginUserThunk = async (
  url: string,
  payload: { email: string; password: string },
  thunkApi: GetThunkAPI<AsyncThunkConfig>
) => {
  try {
    const {
      data: { user },
    } = await customFetch.post<{ user: User }>(url, payload)
    return user
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.response.data.msg)
  }
}

// * Previous without Iterceptors
// export const updateUserThunk = async (
//   url: string,
//   payload: User,
//   thunkApi: GetThunkAPI<AsyncThunkConfig>
// ) => {
//   try {
//     const {
//       data: { user },
//     } = await customFetch.patch<{ user: User }>(
//       url,
//       payload,
//       authHeader(thunkApi)
//     )

//     return user
//   } catch (error: any) {
//     console.log(error.response)
//     if (error.response.status === 401)
//       thunkApi.dispatch(logoutUser('Please Login Again...'))
//     return thunkApi.rejectWithValue(error.response.data.msg)
//   }
// }

// * Latest with Interceptors
export const updateUserThunk = async (
  url: string,
  payload: User,
  thunkApi: GetThunkAPI<AsyncThunkConfig>
) => {
  try {
    const {
      data: { user },
    } = await customFetch.patch<{ user: User }>(url, payload)

    return user
  } catch (error: any) {
    console.log(error.response)
    if (error.response.status === 401)
      thunkApi.dispatch(logoutUser('Please Login Again...'))
    return checkForUnauthorizedResponse(error, thunkApi)
  }
}
