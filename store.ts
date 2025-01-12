import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/global/globalSlice";
import userReducer from "./features/user/userSlice";

export const store = configureStore({
  reducer: {
    global: counterReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
