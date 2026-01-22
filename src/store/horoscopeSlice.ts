// src/store/horoscopeSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Horoscope } from "@/types/horoscope";

interface HoroscopeState {
  current: Horoscope | null;
  loading: boolean;
}

const initialState: HoroscopeState = {
  current: null,
  loading: false,
};

const horoscopeSlice = createSlice({
  name: "horoscope",
  initialState,
  reducers: {
    setHoroscope(state, action: PayloadAction<Horoscope | null>) {
      state.current = action.payload;
      state.loading = false;
    },
    setHoroscopeLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { setHoroscope, setHoroscopeLoading } = horoscopeSlice.actions;
export default horoscopeSlice.reducer;
