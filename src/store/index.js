import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartReducer'
import cartFbReducer from './cartSlice'


export const store = configureStore({
  reducer: {
    cart: cartReducer,
    cartFb: cartFbReducer
  },
})