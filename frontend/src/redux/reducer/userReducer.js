import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { callApi } from '../../API/callAPI';

export const login = createAsyncThunk(
    'user/getDetailUser',
    async data => {
        const response = await callApi('login', 'POST', data)
        console.log(response)
        localStorage.setItem('token', response.token);
        return response
    }
)

export const loginToken = createAsyncThunk(
    'user/getUserToken',
    async () => {
        const response = await callApi('detailUser', 'GET')
        return response
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: [],
    },
    reducers: {
        //logout 
        logout(state, action) {
            state.user = action.payload
        },

        //change user
        changeUser(state, action) {
            state.user = action.payload
        }
    },
    extraReducers: {
        //login
        [login.pending]: (state, action) => {
            console.log('loading.....')
        },
        [login.fulfilled]: (state, action) => {
            state.user = action.payload
        },
        [login.rejected]: (state, action) => {
            console.log('FAIL!!!')
        },

        //login Token
        [loginToken.pending]: (state, action) => {
            console.log('loading.....')
        },
        [loginToken.fulfilled]: (state, action) => {
            state.user = action.payload
        },
        [loginToken.rejected]: (state, action) => {
            console.log('FAIL!!!.')
        },
    }
})

export const {
    logout,
    changeUser
} = userSlice.actions

export const userReducer = userSlice.reducer;

export const userSlector = state => state.userReducer.user
