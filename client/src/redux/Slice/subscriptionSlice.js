import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  plan: null, // Initially, no plan is selected
};

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    setSubscriptionPlan(state, action) {
      state.plan = action.payload; // Update the selected subscription plan
    },
  },
});

export const { setSubscriptionPlan } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;
