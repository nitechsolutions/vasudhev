// src/store/index.ts

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import postReducer from "./postSlice";
import horoscopeReducer from "./horoscopeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
    horoscope: horoscopeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
