import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  info: {},
  isLoggedIn: false,
  accessToken: ''
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.info = action.payload.info
      state.isLoggedIn = action.payload.isLoggedIn
      state.accessToken = action.payload.accessToken
    },
    logoutUser: (state) => {
      state.info = initialState.info
      state.isLoggedIn = initialState.isLoggedIn
      state.accessToken = initialState.accessToken
    }
  }
})

export const { loginUser, logoutUser } = userSlice.actions

export default userSlice.reducer
