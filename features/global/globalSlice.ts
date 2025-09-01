import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface GlobalState {
  deckViewerOpenWithDeckId: string;
  cardViewerOpenWithCardIds: string[];
}

const initialState: GlobalState = {
  deckViewerOpenWithDeckId: '',
  cardViewerOpenWithCardIds: []
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setDeckViewerOpenWithDeckId: (state, action: PayloadAction<string>) => {
      state.deckViewerOpenWithDeckId = action.payload;
    },
    setCardViewerOpenWithCardIds: (state, action: PayloadAction<string[]>) => {
      state.cardViewerOpenWithCardIds = action.payload;
    },
  },
});

export const { setDeckViewerOpenWithDeckId, setCardViewerOpenWithCardIds } = globalSlice.actions;

export default globalSlice.reducer;

export const selectGlobal = (state: any) => state.global;

export const selectDeckViewerOpenWithDeckId = createSelector(
  selectGlobal,
  (global) => global.deckViewerOpenWithDeckId
);

export const selectCardViewerOpenWithCardIds = createSelector(
  selectGlobal,
  (global) => global.cardViewerOpenWithCardIds
);
