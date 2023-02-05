import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ref, onValue } from "firebase/database";
import { database } from "../firebase";

const getAsyncShirts = createAsyncThunk(
  'getAsyncShirt', () => {}
)

const initialState = {
  isCartOpen: false,
  cart: [],
  items: [],
}

const cartFirebase = createSlice({
  name: 'cartFb',
  initialState,
  reducers: {
    setCartFb: (state, action) => {
      state.items = action.payload
    }
  },
  extraReducers: {
    [getAsyncShirts.pending]: (state, action) => {
      state.isLoading = true
      console.log(action.payload)
    },
    [getAsyncShirts.fulfilled]: (state, action) => {
      state.items = action.payload;
      console.log(action.payload)
      state.isLoading = false
    },
    [getAsyncShirts.rejected]: (state, action) => {
      state.isError = false;
    }
  }
})

export const {
  setCartFb,
} = cartFirebase.actions;

export default cartFirebase.reducer;