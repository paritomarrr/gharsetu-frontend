import { configureStore } from '@reduxjs/toolkit'
import signInReducer from './slices/SignInSlice';
import PropertyFromReducer from './slices/PropertyFormSlice'


export const store = configureStore({
    reducer:{
        signInModal: signInReducer,
        propertyForm: PropertyFromReducer
    }
})