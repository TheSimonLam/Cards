import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface GlobalState {
  authSession: string | null;
  authIsLoading: boolean;
}

const initialState: GlobalState = {
  authSession: null,
  authIsLoading: false,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setAuthIsLoading: (state, action: PayloadAction<boolean>) => {
      state.authIsLoading = action.payload;
    },
    setAuthSession: (state, action) => {
      state.authSession = action.payload;
    },
  },
});

export const { setAuthIsLoading, setAuthSession } = globalSlice.actions;

export default globalSlice.reducer;

export const selectGlobal = (state: any) => state.global;

export const selectAuthSession = createSelector(
  selectGlobal,
  (global) => global.authSession
);
