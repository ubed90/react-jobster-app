import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { User } from '../../model/user'
import { toast } from 'react-toastify'
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from '../../utils/localStorage'
import {
  clearStoreThunk,
  loginUserThunk,
  registerUserThunk,
  updateUserThunk,
} from './userThunk'

interface UserSlice {
  user: User | null
  isLoading: boolean
  isSidebarOpen: boolean
}

const initialState: UserSlice = {
  user: getUserFromLocalStorage(),
  isLoading: false,
  isSidebarOpen: false,
}

// ? THUNKS
export const registerUser = createAsyncThunk(
  'user/registerUser',
  (payload: { name: string; email: string; password: string }, thunkApi) => {
    return registerUserThunk('/auth/register', payload, thunkApi)
  }
)

export const loginUser = createAsyncThunk(
  'user/loginUser',
  (payload: { email: string; password: string }, thunkApi) => {
    return loginUserThunk('/auth/login', payload, thunkApi)
  }
)

export const updateUser = createAsyncThunk(
  'user/updateUser',
  (payload: User, thunkApi) => {
    return updateUserThunk('/auth/updateUser', payload, thunkApi)
  }
)

export const clearStore = createAsyncThunk(
  'user/clearStore',
  (payload: string, thunkAPi) => {
    return clearStoreThunk(payload, thunkAPi)
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen
    },
    logoutUser: (state, { payload }) => {
      state.user = null
      state.isSidebarOpen = false
      removeUserFromLocalStorage()
      if (payload) {
        toast.success(payload)
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.user = payload
        addUserToLocalStorage(payload)
        toast.success(`Hello There, ${payload?.name}`)
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(`${payload}`)
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.user = payload
        addUserToLocalStorage(payload)
        toast.success(`Welcome Back, ${payload?.name}`)
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(`${payload}`)
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.user = payload
        addUserToLocalStorage(payload)
        toast.success(`Profile Updated Successfully`)
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(`${payload}`)
      })
      .addCase(clearStore.rejected, () => {
        toast.error('There was an error...')
      })
  },
})

export default userSlice.reducer

export const { toggleSidebar, logoutUser } = userSlice.actions
