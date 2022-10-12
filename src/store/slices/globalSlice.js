import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  loading: false
}
export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    toggleLoading: (state) => {
      state.loading = !state.loading
    }
  }
})

export const { toggleLoading } = globalSlice.actions

export default globalSlice.reducer
