import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItems: (state, action) => {
            state.push(action.payload);
        },
        removeItem: (state, action) => {
            return state.filter((item) => item.id !== action.payload);// Remove an item from the cart
        },// Remove an item from the cart

    }
})

export const getTotalPrice = (state) => state.cart.reduce((total, item) => total + item.price, 0);// Calculate total price

export const { addItems, removeItem } = cartSlice.actions;// Export actions
export default cartSlice.reducer;// Export reducer