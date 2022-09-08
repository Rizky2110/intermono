import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { HYDRATE } from "next-redux-wrapper";
import type { RootState } from "src/app/store";
import {
  Group,
  Groups,
  RequestGroups,
  RequestGroupsCreate,
  RequestGroupsDeleteOne,
  RequestGroupsOne,
} from "src/dto";
import type { BaseInitialState } from "src/lib/constants";
import groupService from "./groupService";

export interface InitialStateGroup extends BaseInitialState {
  list: Groups;
  detail: Group;
  message: unknown;
}

const initialState: InitialStateGroup = {
  isSuccess: false,
  isError: false,
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
  detail: {
    status: false,
    message: "",
    result: {
      id: 0,
      name: "First Group",
      description: "",
      component_type_id: 0,
      created_at: "",
      updated_at: "",
      component_id: [],
      component_type: {
        id: 0,
        name: "",
        description: "",
        created_at: "",
        updated_at: "",
        deleted_at: null,
      },
      component_ids: [],
      components: [],
    },
  },
};

export const getAllGroups = createAsyncThunk(
  "group/getAllGroup",
  async (dto: RequestGroups, thunkApi) => {
    try {
      return await groupService.getAllGroups(dto);
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

export const getOneGroup = createAsyncThunk(
  "group/getOneGroup",
  async (dto: RequestGroupsOne, thunkApi) => {
    try {
      return await groupService.getOneGroup(dto);
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

export const deleteOneGroup = createAsyncThunk(
  "group/deleteOneGroup",
  async (dto: RequestGroupsDeleteOne, thunkApi) => {
    try {
      const { group } = thunkApi.getState() as RootState;

      const data = await groupService.deleteOneGroup(dto);

      await thunkApi.dispatch(
        getAllGroups({
          datas: {
            page: group.list.result.current_page,
            page_size: group.list.result.per_page,
          },
        })
      );

      return data;
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

export const createOneGroup = createAsyncThunk(
  "group/createOneGroup",
  async (dto: RequestGroupsCreate, thunkApi) => {
    try {
      return await groupService.createOneGroup(dto);
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

const groupSlice = createSlice({
  name: "group",
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
        if (current.payload.group.list.status) {
          state.list = current.payload.group.list;
        }
        if (current.payload.group.detail.status) {
          state.detail = current.payload.group.detail;
        }
      })

      // Groups
      .addCase(getAllGroups.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllGroups.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.list = action.payload;
      })
      .addCase(getAllGroups.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = (action.payload as string) || "";
      })

      // One Group
      .addCase(getOneGroup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOneGroup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.detail = action.payload;
      })
      .addCase(getOneGroup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = (action.payload as string) || "";
      })

      // Create Group
      .addCase(createOneGroup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOneGroup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.list.result.total += 1;
        state.list.result.data = [
          action.payload.result,
          ...state.list.result.data,
        ];
        if (state.list.result.data.length > state.list.result.per_page) {
          state.list.result.data.pop();
        }
      })
      .addCase(createOneGroup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = (action.payload as string) || "";
      })

      // Delete one group
      .addCase(deleteOneGroup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteOneGroup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.list.result.data = state.list.result.data.filter(
          (d) => d.id !== action.payload.groupId
        );
      })
      .addCase(deleteOneGroup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = (action.payload as string) || "";
      });
  },
});

export const { reset: resetGroup } = groupSlice.actions;
export default groupSlice.reducer;
