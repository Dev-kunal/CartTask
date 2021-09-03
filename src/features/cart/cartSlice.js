import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cartItems.push({
        ...action.payload.product,
        quantity: 1,
        savings: 0,
      });
    },
    increaseQuantity: (state, action) => {
      const product = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      state.cartItems[product].quantity += 1;
      state.cartItems[product].savings = action.payload.discount;
    },
    decreaseQuantity: (state, action) => {
      const product = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      state.cartItems[product].quantity -= 1;
    },
    removeSavings: (state, action) => {
      const product = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      state.cartItems[product].savings = 0;
    },
    preserveSavings: (state, action) => {
      const product = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      state.cartItems[product].savings = action.payload.discount;
    },
  },
});

export const {
  increaseQuantity,
  decreaseQuantity,
  addToCart,
  removeSavings,
  preserveSavings,
} = cartSlice.actions;

export default cartSlice.reducer;
