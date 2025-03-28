import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slice/authSlice";
import subscriptionReducer from "./Slice/subscriptionSlice";
import cartReducer from "./Slice/cartSlice"; // Import Cart Reducer

const store = configureStore({
  reducer: {
    auth: authReducer,
    subscription: subscriptionReducer,
    cart: cartReducer, // Add cart reducer
  },
});

export default store;
