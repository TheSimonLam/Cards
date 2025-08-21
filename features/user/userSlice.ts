import {
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { fetchUserByUserId } from "./userThunks";

export interface UserState {
  value: number;
  userDetails: any
}

const initialState: UserState = {
  value: 0,
  userDetails: {}
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
    })
  },
});

export const { increment, decrement, incrementByAmount } = userSlice.actions;

export default userSlice.reducer;

export const selectUser = (state: any) => state.user;

export const selectUserValue = createSelector(
  selectUser,
  (user) => user.value
);

export const selectUserDetails = createSelector(
  selectUser,
  (user) => user.userDetails
);
