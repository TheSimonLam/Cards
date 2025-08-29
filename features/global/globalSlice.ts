import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface GlobalState {
  deckViewerOpenWithDeckId: string;
}

const initialState: GlobalState = {
  deckViewerOpenWithDeckId: '',
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setDeckViewerOpenWithDeckId: (state, action: PayloadAction<string>) => {
      state.deckViewerOpenWithDeckId = action.payload;
    },
  },
});

export const { setDeckViewerOpenWithDeckId } = globalSlice.actions;

export default globalSlice.reducer;

export const selectGlobal = (state: any) => state.global;

export const selectDeckViewerOpenWithDeckId = createSelector(
  selectGlobal,
  (global) => global.deckViewerOpenWithDeckId
);
