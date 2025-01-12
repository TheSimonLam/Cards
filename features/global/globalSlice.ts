import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface GlobalState {
  someVal: boolean;
}

const initialState: GlobalState = {
  someVal: false,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setSomeVal: (state, action: PayloadAction<boolean>) => {
      state.someVal = action.payload;
    },
  },
});

export const { setSomeVal } = globalSlice.actions;

export default globalSlice.reducer;

export const selectGlobal = (state: any) => state.global;

export const selectSomeVal = createSelector(
  selectGlobal,
  (global) => global.someVal
);
