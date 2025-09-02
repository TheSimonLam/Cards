import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { fetchBuyPack } from "../user/userThunks";
import { Card } from "@/types/types";
import { RootState } from "../store";

export interface GlobalState {
  deckViewerOpenWithDeckId: string;
  cardViewerOpenWithCards: Card[];
}

const initialState: GlobalState = {
  deckViewerOpenWithDeckId: '',
  cardViewerOpenWithCards: []
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setDeckViewerOpenWithDeckId: (state, action: PayloadAction<string>) => {
      state.deckViewerOpenWithDeckId = action.payload;
    },
    setcardViewerOpenWithCards: (state, action: PayloadAction<Card[]>) => {
      state.cardViewerOpenWithCards = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBuyPack.fulfilled, (state, action) => {
      state.cardViewerOpenWithCards = action.payload.newCards
    })
  },
});

export const { setDeckViewerOpenWithDeckId, setcardViewerOpenWithCards } = globalSlice.actions;

export default globalSlice.reducer;

export const selectGlobal = (state: RootState) => state.global;

export const selectDeckViewerOpenWithDeckId = createSelector(
  selectGlobal,
  (global) => global.deckViewerOpenWithDeckId
);

export const selectCardViewerOpenWithCards = createSelector(
  selectGlobal,
  (global) => global.cardViewerOpenWithCards
);
