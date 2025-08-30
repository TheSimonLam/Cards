import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./global/globalSlice";
import userReducer from "./user/userSlice";
import cardsReducer from "./cards/cardsSlice";

export const store = configureStore({
  reducer: {
    global: counterReducer,
    user: userReducer,
    cards: cardsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
