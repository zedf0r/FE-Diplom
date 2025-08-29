import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ADDED_PARAMS } from "./actions";

type TypeTicketsParams = {
  total_count: number;
  items: [];
};

type TypeTiketsState = {
  tickets: TypeTicketsParams;
  isLoading: boolean;
};

const initialState: TypeTiketsState = {
  tickets: {
    total_count: 0,
    items: [],
  },
  isLoading: true,
};

export const ticketsSlice = createSlice({
  name: ADDED_PARAMS,
  initialState,
  reducers: {
    setTikets: (state, action: PayloadAction<TypeTicketsParams>) => {
      state.tickets = { ...state, ...action.payload };
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setTikets, setIsLoading } = ticketsSlice.actions;

export default ticketsSlice.reducer;
