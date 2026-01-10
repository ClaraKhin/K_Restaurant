import { configureStore } from '@reduxjs/toolkit'
import customerSlice from './slices/customerSlice';

// Create the Redux store
const store = configureStore({
    reducer: {
        customer: customerSlice
    },

    devTools: import.meta.env.NODE_ENV !== 'production',
})

export default store;