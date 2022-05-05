import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: {
        info: {},
        isLoggedIn: false,
        accessToken: ""
    }
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginUser: (state, action) => {
            console.log(action.payload.user)
            state.user = {...action.payload.user}
        },
        logoutUser: (state) => {
            state.user = {...initialState}
        }
    }
})

export const {loginUser, logoutUser} = userSlice.actions

export default userSlice.reducer