import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface GlobalState {
  authSession: string | null;
  isAuthLoading: boolean;
}

const initialState: GlobalState = {
  authSession: null,
  isAuthLoading: false,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.isAuthLoading = action.payload;
    },
    setAuthSession: (state, action) => {
      state.authSession = action.payload;
    },
  },
});

export const { setIsAuthLoading, setAuthSession } = globalSlice.actions;

export default globalSlice.reducer;

export const selectGlobal = (state: any) => state.global;

export const selectAuthSession = createSelector(
  selectGlobal,
  (global) => global.authSession
);

export const selectIsAuthLoading = createSelector(
  selectGlobal,
  (global) => global.isAuthLoading
);
