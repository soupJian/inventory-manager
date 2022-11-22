import { createSlice } from "@reduxjs/toolkit"
const initialState = {
  loading: false,
  fullLoading: false
}
export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    toggleLoading: (state, action) => {
      state.loading = action.payload
    },
    toggleFullLoading: (state, action) => {
      state.fullLoading = action.payload
    }
  }
})

export const { toggleLoading, toggleFullLoading } = globalSlice.actions

export default globalSlice.reducer
