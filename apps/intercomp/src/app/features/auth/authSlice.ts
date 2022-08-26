import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { DataUser as User, RequestLogin, RequestMe } from "src/dto";
import { BaseInitialState } from "src/lib/constants";
import authService from "./authService";

export interface InitialStateAuth extends BaseInitialState {
  user: User | null;
  isSuccessMe: boolean;
  isSuccessLogout: boolean;
  message: unknown;
}

let user: User | null = null;

if (typeof window !== "undefined") {
  user = JSON.parse(localStorage.getItem("intercomp::user") || "null");
}

export const login = createAsyncThunk(
  "auth/login",
  async (data: RequestLogin, thunkApi) => {
    try {
      return await authService.login(data);
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

export const logout = createAsyncThunk("auth/logout", async (_, thunkApi) => {
  try {
    return await authService.logout();
  } catch (error) {
    const err = error as AxiosError | Error;
    if (axios.isAxiosError(err)) {
      const message = err.response && err.response.data;

      return thunkApi.rejectWithValue(message);
    }

    const message = err.message || err.toString();

    return thunkApi.rejectWithValue(message);
  }
});

export const me = createAsyncThunk(
  "auth/me",
  async (data: RequestMe, thunkApi) => {
    try {
      return await authService.me(data);
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

const initialState: InitialStateAuth = {
  user: user || null,
  isLoading: false,
  isSuccessMe: false,
  isSuccess: false,
  isSuccessLogout: false,
  isError: false,
  message: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.isSuccessMe = false;
      state.isSuccessLogout = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "";
      })
      .addCase(me.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(me.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccessMe = true;
        state.user = action.payload;
      })
      .addCase(me.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "";
      })

      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccessLogout = true;
        state.user = null;
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { reset: resetAuth } = authSlice.actions;
export default authSlice.reducer;
