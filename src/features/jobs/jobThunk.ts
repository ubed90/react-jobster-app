import { GetThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk'
import { AsyncThunkConfig, RootState } from '../../Store'
import { IAllJobs, IJob, IStats } from '../../model/job'
import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios'
import { logoutUser } from '../user'
import { clearValues } from './jobsCrudSlice'
import { showLoading, getAllJobs, hideLoading } from './allJobsSlice'

const authHeader = (thunkAPI: GetThunkAPI<AsyncThunkConfig>) => {
  return {
    headers: {
      Authorization: `Bearer ${
        (thunkAPI.getState() as RootState).user.user?.token
      }`,
    },
  }
}

// * Previous
// export const createJobThunk = async (
//   payload: IJob,
//   thunkAPI: GetThunkAPI<AsyncThunkConfig>
// ) => {
//   try {
//     const { data } = await customFetch.post<IJob>('/jobs', payload, {
//       headers: {
//         Authorization: `Bearer ${
//           (thunkAPI.getState() as RootState).user.user?.token
//         }`,
//       },
//     })

//     thunkAPI.dispatch(clearValues())
//     return data
//   } catch (error: any) {
//     if (error.response.status === 401) {
//       thunkAPI.dispatch(logoutUser(''))
//       return thunkAPI.rejectWithValue('Unauthorized! Logging out...')
//     }

//     return checkForUnauthorizedResponse(error, thunkAPI)
//   }
// }

// * LATEST
export const createJobThunk = async (
  payload: IJob,
  thunkAPI: GetThunkAPI<AsyncThunkConfig>
) => {
  try {
    const { data } = await customFetch.post<IJob>('/jobs', payload)

    thunkAPI.dispatch(clearValues())
    return data
  } catch (error: any) {
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser(''))
      return thunkAPI.rejectWithValue('Unauthorized Logging out...')
    }

    return checkForUnauthorizedResponse(error, thunkAPI)
  }
}

export const deleteJobThunk = async (
  jobId: string,
  thunkAPI: GetThunkAPI<AsyncThunkConfig>
) => {
  thunkAPI.dispatch(showLoading())
  try {
    const resp = await customFetch.delete(`/jobs/${jobId}`)
    thunkAPI.dispatch(getAllJobs())
    return resp.data.msg
  } catch (error: any) {
    thunkAPI.dispatch(hideLoading())
    return checkForUnauthorizedResponse(error, thunkAPI)
  }
}

export const updateJobThunk = async (
  { jobId, job }: { jobId: string; job: IJob },
  thunkAPI: GetThunkAPI<AsyncThunkConfig>
) => {
  try {
    const resp = await customFetch.patch(`/jobs/${jobId}`, job)

    thunkAPI.dispatch(clearValues())
    return resp.data
  } catch (error: any) {
    return checkForUnauthorizedResponse(error, thunkAPI)
  }
}

export const getAllJobsThunk = async (
  url: string,
  thunkAPI: GetThunkAPI<AsyncThunkConfig>
) => {
  try {
    const { data } = await customFetch.get<IAllJobs>(url, {
      headers: {
        Authorization: `Bearer ${
          (thunkAPI.getState() as RootState).user.user?.token
        }`,
      },
    })
    console.log(data)
    return data
  } catch (error: any) {
    return checkForUnauthorizedResponse(error, thunkAPI)
  }
}

export const showStatsThunk = async (
  url: string,
  thunkAPI: GetThunkAPI<AsyncThunkConfig>
) => {
  try {
    const { data } = await customFetch.get<IStats>(url)
    console.log(data)
    return data
  } catch (error: any) {
    return checkForUnauthorizedResponse(error, thunkAPI)
  }
}
