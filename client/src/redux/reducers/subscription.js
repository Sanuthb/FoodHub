const initialState = {
    plan: null, // initially, no plan is selected
  };
  
  const subscriptionReducer = (state = initialState, action) => {
    switch (action.type) {
      case "SET_SUBSCRIPTION_PLAN":
        return {
          ...state,
          plan: action.payload, // update the subscription plan
        };
      default:
        return state;
    }
  };
  
  export default subscriptionReducer;
  