import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ADDED_PARAMS } from "./actions";
import type { TypeTicket } from "../../types";

type TypeTicketsParams = {
  total_count: number;
  items: TypeTicket[];
};

type TypeTiketsState = {
  tickets: TypeTicketsParams;
  isLoading: boolean;
  lastTickets: TypeTicket[];
};

const initialState: TypeTiketsState = {
  tickets: {
    total_count: 0,
    items: [],
  },
  isLoading: false,
  lastTickets: [],
};

export const ticketsSlice = createSlice({
  name: ADDED_PARAMS,
  initialState,
  reducers: {
    setTikets: (state, action: PayloadAction<TypeTicketsParams>) => {
      state.tickets = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setLastTickets: (state, action: PayloadAction<TypeTicket[]>) => {
      state.lastTickets = action.payload;
    },
  },
});

export const { setTikets, setIsLoading, setLastTickets } = ticketsSlice.actions;

export default ticketsSlice.reducer;
