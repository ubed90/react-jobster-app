import { createJobThunk, deleteJobThunk, updateJobThunk } from './jobThunk'
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IJob } from '../../model/job'
import { toast } from 'react-toastify'
import { getUserFromLocalStorage } from '../../utils/localStorage'

interface IJobSlice extends IJob {
  jobTypeOptions: string[]
  statusOptions: string[]
  isLoading: boolean
  isEditing: boolean
  editJobId: string
}

const initialState: IJobSlice = {
  company: '',
  position: '',
  status: 'pending',
  jobType: 'full-time',
  jobLocation: '',
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  statusOptions: ['interview', 'declined', 'pending'],
  isLoading: false,
  isEditing: false,
  editJobId: '',
}

// * THUNKS
// ! CREATE
export const createJob = createAsyncThunk(
  'job/createJob',
  (payload: IJob, thunkApi) => {
    return createJobThunk(payload, thunkApi)
  }
)

// ! DELETE
export const deleteJob = createAsyncThunk(
  'job/deleteJob',
  (payload: string, thunkApi) => {
    return deleteJobThunk(payload, thunkApi)
  }
)

// ! UPDATE
export const updateJob = createAsyncThunk(
  'job/editJob',
  (payload: { jobId: string; job: IJob }, thunkApi) => {
    return updateJobThunk(payload, thunkApi)
  }
)

// ? SLICE

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    handleChange: (
      state,
      { payload }: PayloadAction<{ name: string; value: string }>
    ) => {
      const { name, value } = payload as {
        name: string
        value: string
      }
      ;(state as any)[name] = value
    },
    clearValues: () => {
      return {
        ...initialState,
        jobLocation: getUserFromLocalStorage()?.location || '',
      }
    },
    setEditJob: (state, { payload }) => {
      return {
        ...state,
        isEditing: true,
        ...payload,
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createJob.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createJob.fulfilled, (state) => {
        state.isLoading = false
        toast.success('Job created Successfully!')
      })
      .addCase(createJob.rejected, (state, { payload }) => {
        state.isLoading = true
        toast.error(`${payload}`)
      })
      .addCase(deleteJob.rejected, (_, { payload }) => {
        toast.error(`${payload}`)
      })
      .addCase(deleteJob.fulfilled, (_, { payload }) => {
        toast.success(`${payload}`)
      })
      .addCase(updateJob.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateJob.fulfilled, (state) => {
        state.isLoading = false
        toast.success('Job Modified Successfully!')
      })
      .addCase(updateJob.rejected, (state, { payload }) => {
        state.isLoading = true
        toast.error(`${payload}`)
      })
  },
})

export const { handleChange, clearValues, setEditJob } = jobSlice.actions

export default jobSlice.reducer
