import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

// * State Slices
import userSlice from './features/user'
import jobSlice from './features/jobs/jobsCrudSlice'
import allJobsSlice from './features/jobs/allJobsSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    job: jobSlice,
    allJobs: allJobsSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AsyncThunkConfig = {
  /** return type for `thunkApi.getState` */
  state?: RootState
  /** type for `thunkApi.dispatch` */
  dispatch?: AppDispatch
  /** type of the `extra` argument for the thunk middleware, which will be passed in as `thunkApi.extra` */
  extra?: unknown
  /** type to be passed into `rejectWithValue`'s first argument that will end up on `rejectedAction.payload` */
  rejectValue?: string
  /** return type of the `serializeError` option callback */
  serializedErrorType?: unknown
  /** type to be returned from the `getPendingMeta` option callback & merged into `pendingAction.meta` */
  pendingMeta?: unknown
  /** type to be passed into the second argument of `fulfillWithValue` to finally be merged into `fulfilledAction.meta` */
  fulfilledMeta?: unknown
  /** type to be passed into the second argument of `rejectWithValue` to finally be merged into `rejectedAction.meta` */
  rejectedMeta?: unknown
}

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
