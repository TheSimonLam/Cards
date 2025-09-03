import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { fetchBuyPack } from "../user/userThunks";
import { Card, Pack } from "@/typing/interfaces";
import { RootState } from "../store";
import { fetchCardMetadata, fetchDeckById, fetchPacks } from "./globalThunks";

export interface GlobalState {
  deckViewerOpenWithDeckId: string;
  cardViewerOpenWithCards: Card[];
  packs: Pack[],
  cardMetadata: Card[] //TODO: This will eventually be removed in favour for hard coding cards into the app and maintained by version number
  deckCards: Card[];
}

const initialState: GlobalState = {
  deckViewerOpenWithDeckId: '',
  cardViewerOpenWithCards: [],
  packs: [],
  cardMetadata: [],
  deckCards: []
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setDeckViewerOpenWithDeckId: (state, action: PayloadAction<string>) => {
      state.deckViewerOpenWithDeckId = action.payload;
    },
    setCardViewerOpenWithCards: (state, action: PayloadAction<Card[]>) => {
      state.cardViewerOpenWithCards = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPacks.fulfilled, (state, action) => {
      state.packs = action.payload
    })
    builder.addCase(fetchCardMetadata.fulfilled, (state, action) => {
      state.cardMetadata = action.payload
    }),
    builder.addCase(fetchBuyPack.fulfilled, (state, action) => {
      const newCardsSortedByRarity = action.payload.newCards.sort((a: Card, b: Card)=>a.rarity - b.rarity)
      state.cardViewerOpenWithCards = newCardsSortedByRarity
    }),
    builder.addCase(fetchDeckById.fulfilled, (state, action) => {
      // This is where we map/enrich card data
      state.deckCards = action.payload.map((cardMetadataId: number)=>state.cardMetadata[cardMetadataId - 1])
    })
  },
});

export const { setDeckViewerOpenWithDeckId, setCardViewerOpenWithCards } = globalSlice.actions;

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

export const selectPacks = createSelector(
  selectGlobal,
  (cards) => cards.packs
);

export const selectCardMetadata = createSelector(
  selectGlobal,
  (cards) => cards.cardMetadata
);

export const selectDeckCards = createSelector(
  selectGlobal,
  (cards) => cards.deckCards
);
