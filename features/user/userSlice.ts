import {
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { fetchAddUserMoney, fetchUserByUserId } from "./userThunks";
import { fetchDecksByUserId } from "../global/globalThunks";
import { RootState } from "../store";
import { Deck, User } from "@/typing/interfaces";

export interface UserState {
  value: number;
  userDetails: User
  decks: Deck[]
}

const initialState: UserState = {
  value: 0,
  userDetails: {
    background_pic: '',
    balance: 0,
    created_at: undefined,
    display_name: '',
    email_address: '',
    profile_pic: '',
    tagline: '',
    user_id: ''
  },
  decks: []
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserByUserId.fulfilled, (state, action) => {
      state.userDetails = action.payload
    }),
    builder.addCase(fetchAddUserMoney.fulfilled, (state, action) => {
      state.userDetails = action.payload
    }),
    builder.addCase(fetchDecksByUserId.fulfilled, (state, action) => {
      state.decks = action.payload
    })
  },
});

export const { increment, decrement, incrementByAmount } = userSlice.actions;

export default userSlice.reducer;

export const selectUser = (state: RootState) => state.user;

export const selectUserValue = createSelector(
  selectUser,
  (user) => user.value
);

export const selectUserDetails = createSelector(
  selectUser,
  (user) => user.userDetails
);

export const selectDecks = createSelector(
  selectUser,
  (user) => user.decks
);
