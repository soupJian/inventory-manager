import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  loading: false
}
export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    toggleLoading: (state, action) => {
      state.loading = action.payload
    }
  }
})

export const { toggleLoading } = globalSlice.actions

export default globalSlice.reducer
