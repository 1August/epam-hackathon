import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    id: null,
    email: null,
    token: null,
    role: null
}
// const initialState = {
//     id: null,
//     email: null,
//     token: 'null',
//     role: 'client'
// }

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.id = action.payload.id
            state.email = action.payload.email
            state.token = action.payload.token
            state.role = action.payload.role

            localStorage.setItem('token', action.payload.token)
        },
        logout: (state) => {
            state.id = null
            state.email = null
            state.token = null
            state.role = null

            localStorage.removeItem('token')
        }
    }
})

export const { loginSuccess, logout } = authSlice.actions
export default authSlice.reducer
