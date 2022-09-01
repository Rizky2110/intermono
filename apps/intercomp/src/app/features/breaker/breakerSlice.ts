import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { HYDRATE } from "next-redux-wrapper";
import type { RootState } from "src/app/store";
import { Breakers, RequestComponentBreaker } from "src/dto";
import { BaseInitialState } from "src/lib/constants";
import breakerService from "./breakerService";

export interface InitialStateBreaker extends BaseInitialState {
  list: Breakers;
  message: unknown;
}

const initialState: InitialStateBreaker = {
  isError: false,
  isSuccess: false,
  isLoading: false,
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
};

export const getAllBreakers = createAsyncThunk(
  "breaker/getAllBreakers",
  async (dto: RequestComponentBreaker, thunkApi) => {
    try {
      return await breakerService.getAllBreaker(dto);
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

const breakerSlice = createSlice({
  name: "breaker",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // HYDRATION
      .addCase(HYDRATE, (state, action) => {
        const current = action as PayloadAction<RootState>;
        if (current.payload.breaker.list.status) {
          state.list = current.payload.breaker.list;
        }
      })

      // Component Status
      .addCase(getAllBreakers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBreakers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.list = action.payload;
      })
      .addCase(getAllBreakers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = (action.payload as string) || "";
      });
  },
});

export const { reset: resetBreaker } = breakerSlice.actions;
export default breakerSlice.reducer;
