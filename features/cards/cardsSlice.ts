import {
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { fetchDeckById, fetchPacks } from "./cardsThunks";
import { RootState } from "../store";
import { Deck, Pack } from "@/typing/interfaces";

export interface CardsState {
  packs: Pack[],
  deckCardList: string[]
}

const initialState: CardsState = {
  packs: [],
  deckCardList: []
};

export const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    setSomething: (state, action: PayloadAction<[]>) => {
      state.packs = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPacks.fulfilled, (state, action) => {
      state.packs = action.payload
    })
    builder.addCase(fetchDeckById.fulfilled, (state, action) => {
      state.deckCardList = action.payload
    })
  },
});

export const { setSomething } = cardsSlice.actions;

export default cardsSlice.reducer;

export const selectCards = (state: RootState) => state.cards;

export const selectPacks = createSelector(
  selectCards,
  (cards) => cards.packs
);

export const selectDeckCardList = createSelector(
  selectCards,
  (cards) => cards.deckCardList
);
