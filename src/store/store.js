import { configureStore } from '@reduxjs/toolkit'
import signInReducer from './slices/SignInSlice';


export const store = configureStore({
    reducer:{
        signInModal: signInReducer,
    }
})