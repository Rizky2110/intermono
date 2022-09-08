import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { HYDRATE } from "next-redux-wrapper";
import type { RootState } from "src/app/store";
import type {
  Breaker,
  Breakers,
  RequestComponentBreaker,
  RequestComponentBreakerGetOne,
  RequestComponentBreakerSetting,
  RequestConfigOther,
  RequestConfigRestart,
} from "src/dto";
import { BaseInitialState } from "src/lib/constants";
import breakerService from "./breakerService";

export interface InitialStateBreaker extends BaseInitialState {
  list: Breakers;
  detail: Breaker | null;
  message: unknown;
  isSuccessRestart: boolean;
  isErrorRestart: boolean;
}

const initialState: InitialStateBreaker = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  isSuccessRestart: false,
  isErrorRestart: false,
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

export const getOneBreaker = createAsyncThunk(
  "breaker/getOneBreaker",
  async (dto: RequestComponentBreakerGetOne, thunkApi) => {
    try {
      return await breakerService.getOneBreker(dto);
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

export const updateSettingBreaker = createAsyncThunk(
  "breaker/updateSettingBreaker",
  async (dto: RequestComponentBreakerSetting, thunkApi) => {
    try {
      return await breakerService.updateSettingBreaker(dto);
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

export const configRestart = createAsyncThunk(
  "breaker/configRestart",
  async (dto: RequestConfigRestart, thunkApi) => {
    try {
      return await breakerService.configRestart(dto);
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

export const configUpdate = createAsyncThunk(
  "breaker/configUpdate",
  async (dto: RequestConfigOther, thunkApi) => {
    try {
      return await breakerService.configUpdate(dto);
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
      state.isSuccessRestart = false;
      state.isErrorRestart = false;
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
        if (current.payload.breaker.detail?.status) {
          state.detail = current.payload.breaker.detail;
        }
      })

      // Breakers
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
      })

      // One Breaker
      .addCase(getOneBreaker.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOneBreaker.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.detail = action.payload;
      })
      .addCase(getOneBreaker.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = (action.payload as string) || "";
      })

      // Config Restart
      .addCase(configRestart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(configRestart.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccessRestart = true;
      })
      .addCase(configRestart.rejected, (state, action) => {
        state.isLoading = false;
        state.isErrorRestart = true;
        state.message = (action.payload as string) || "";
      })

      // Config Update Restart
      .addCase(configUpdate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(configUpdate.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccessRestart = true;
      })
      .addCase(configUpdate.rejected, (state, action) => {
        state.isLoading = false;
        state.isErrorRestart = true;
        state.message = (action.payload as string) || "";
      })

      .addCase(updateSettingBreaker.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSettingBreaker.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(updateSettingBreaker.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { reset: resetBreaker } = breakerSlice.actions;
export default breakerSlice.reducer;
