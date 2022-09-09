import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { HYDRATE } from "next-redux-wrapper";
import type { RootState } from "src/app/store";
import type {
  RequestOneSchedule,
  RequestSchedules,
  Schedule,
  Schedules,
} from "src/dto";
import { BaseInitialState } from "src/lib/constants";
import scheduleService from "./scheduleService";

export interface InitialStateSchedule extends BaseInitialState {
  list: Schedules;
  detail: Schedule | null;
  message: unknown;
}

const initialState: InitialStateSchedule = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
  list: {
    status: false,
    message: "",
    result: {
      current_page: 0,
      data: [],
      first_page_url: "",
      from: 0,
      last_page: 0,
      last_page_url: "",
      links: [],
      next_page_url: "",
      path: "",
      per_page: 0,
      prev_page_url: "",
      to: 0,
      total: 0,
    },
  },
  detail: null,
};

export const getAllSchedules = createAsyncThunk(
  "schedule/getAllSchedules",
  async (dto: RequestSchedules, thunkApi) => {
    try {
      return await scheduleService.getAllSchedules(dto);
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

export const getOneSchedule = createAsyncThunk(
  "schedule/getOneSchedule",
  async (dto: RequestOneSchedule, thunkApi) => {
    try {
      return await scheduleService.getOneSchedule(dto);
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

const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // HYDRATION
      .addCase(HYDRATE, (state, action) => {
        const current = action as PayloadAction<RootState>;
        if (current.payload.schedule.list.status) {
          state.list = current.payload.schedule.list;
        }
        if (current.payload.schedule.detail?.status) {
          state.detail = current.payload.schedule.detail;
        }
      })

      // Schedules
      .addCase(getAllSchedules.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllSchedules.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.list = action.payload;
      })
      .addCase(getAllSchedules.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = (action.payload as string) || "";
      })

      // Get One Schedule
      .addCase(getOneSchedule.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOneSchedule.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.detail = action.payload;
      })
      .addCase(getOneSchedule.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = (action.payload as string) || "";
      });
  },
});

export const { reset: resetSchedule } = scheduleSlice.actions;
export default scheduleSlice.reducer;
