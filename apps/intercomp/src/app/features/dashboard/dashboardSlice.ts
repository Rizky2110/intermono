import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { HYDRATE } from "next-redux-wrapper";
import type { RootState } from "src/app/store";
import {
  ComponentStatus,
  RequestComponentStatus,
} from "src/dto/componentStatus";
import { BaseInitialState } from "src/lib/constants";
import dashboardService from "./dashboardService";

export interface InitialStateDashboard extends BaseInitialState {
  componentStatus: ComponentStatus;
  message: unknown;
}

const initialState: InitialStateDashboard = {
  componentStatus: {
    status: false,
    message: "",
    result: {
      breaker: {
        inactive: 0,
        offline: 0,
        online: 0,
        trouble: 0,
      },
    },
  },
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getComponentStatus = createAsyncThunk(
  "dashboard/componentStatus",
  async (dto: RequestComponentStatus, thunkApi) => {
    try {
      return await dashboardService.getcomponentStatus(dto);
    } catch (error) {
      const err = error as AxiosError | Error;
      if (axios.isAxiosError(err)) {
        const message = err.response && err.response.data;

        return thunkApi.rejectWithValue(message);
      }

      const message = err.message || err.toString();

      return thunkApi.rejectWithValue(message);
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",

  initialState,

  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },

  extraReducers: (builder) => {
    builder
      // HYDRATION
      .addCase(HYDRATE, (state, action) => {
        const current = action as PayloadAction<RootState>;
        if (current.payload.dashboard.componentStatus.status) {
          state.componentStatus = current.payload.dashboard.componentStatus;
        }
      })

      // Component Status
      .addCase(getComponentStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getComponentStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.componentStatus = action.payload;
      })
      .addCase(getComponentStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = (action.payload as string) || "";
      });
  },
});

export const { reset: resetDashboard } = dashboardSlice.actions;
export default dashboardSlice.reducer;
