import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import dashboardReducer from "./features/dashboard/dashboardSlice";
import breakerReducer from "./features/breaker/breakerSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  dashboard: dashboardReducer,
  breaker: breakerReducer,
});

export default rootReducer;
