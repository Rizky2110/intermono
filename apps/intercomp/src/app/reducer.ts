import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import dashboardReducer from "./features/dashboard/dashboardSlice";
import breakerReducer from "./features/breaker/breakerSlice";
import groupReducer from "./features/group/groupSlice";
import scheduleReducer from "./features/schedule/scheduleSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  dashboard: dashboardReducer,
  breaker: breakerReducer,
  group: groupReducer,
  schedule: scheduleReducer,
});

export default rootReducer;
