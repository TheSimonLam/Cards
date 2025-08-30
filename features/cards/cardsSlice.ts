import {
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { fetchPacks } from "./cardsThunks";

export interface CardsState {
  packs: any[]
}

const initialState: CardsState = {
  packs: []
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
  },
});

export const { setSomething } = cardsSlice.actions;

export default cardsSlice.reducer;

export const selectCards = (state: any) => state.cards;

export const selectPacks = createSelector(
  selectCards,
  (cards) => cards.packs
);
