import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IAllJobs, IFilters, IStats } from '../../model/job'
import { toast } from 'react-toastify'
import { getAllJobsThunk, showStatsThunk } from './jobThunk'
import { RootState } from '../../Store'

const initialFiltersState: IFilters = {
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
}

const initialState: IAllJobs & IFilters & IStats = {
  isLoading: false,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {
    declined: 0,
    interview: 0,
    pending: 0,
  },
  monthlyApplications: [],
  ...initialFiltersState,
}

// * Thunks
export const getAllJobs = createAsyncThunk('allJobs/getJobs', (_, thunkAPI) => {
  const { searchStatus, page, search, searchType, sort } = (
    thunkAPI.getState() as RootState
  ).allJobs

  let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`

  if (search) url = url + `&search=${search}`

  return getAllJobsThunk(url, thunkAPI)
})

// ? Stats Thunk
export const showStats = createAsyncThunk<IStats>(
  'allJobs/showStats',
  (_, thunkApi) => {
    return showStatsThunk('/jobs/stats', thunkApi)
  }
)

const allJobsSlice = createSlice({
  name: 'allJobs',
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true
    },
    hideLoading: (state) => {
      state.isLoading = false
    },
    handleFiltersChange: (
      state,
      { payload }: PayloadAction<{ name: string; value: string }>
    ) => {
      const { name, value } = payload
      ;(state as any)[name] = value
      state.page = 1
    },
    clearFilters: (state) => {
      return {
        ...state,
        ...initialFiltersState,
      }
    },
    handlePageChange: (state, { payload }: PayloadAction<number>) => {
      state.page = payload
    },
    clearAllJobsState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllJobs.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllJobs.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.jobs = payload.jobs
        state.numOfPages = payload.numOfPages
        state.totalJobs = payload.totalJobs
      })
      .addCase(getAllJobs.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(`${payload}`)
      })
      .addCase(showStats.pending, (state) => {
        state.isLoading = true
      })
      .addCase(showStats.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.stats = (payload as any).defaultStats
        state.monthlyApplications = payload.monthlyApplications
      })
      .addCase(showStats.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(`${payload}`)
      })
  },
})

export const {
  hideLoading,
  showLoading,
  clearFilters,
  handleFiltersChange,
  handlePageChange,
  clearAllJobsState,
} = allJobsSlice.actions

export default allJobsSlice.reducer
