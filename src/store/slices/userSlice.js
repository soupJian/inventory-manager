import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: {},
  isLoggedIn: false,
  token: ''
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload.user
      state.isLoggedIn = action.payload.isLoggedIn
      state.token = action.payload.token
    },
    logoutUser: (state) => {
      state.user = initialState.user
      state.isLoggedIn = initialState.isLoggedIn
      state.token = initialState.token
    }
  }
})

export const { loginUser, logoutUser } = userSlice.actions

export default userSlice.reducer
