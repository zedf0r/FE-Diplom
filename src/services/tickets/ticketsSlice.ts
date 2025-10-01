import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { TypeTicket } from "../../types";

export const ADDED_PARAMS = "ADDED_PARAMS";

type TypeTicketsParams = {
  total_count: number;
  items: TypeTicket[];
};

type TypeTicketTotalPrice = {
  adultPrice: number;
  childPrice: number;
  servicePrice: number;
};

type TypeTiketsState = {
  tickets: TypeTicketsParams;
  isLoading: boolean;
  lastTickets: TypeTicket[];
  ticket: TypeTicket | null;
  totalPrice: {
    arrivalPrice: TypeTicketTotalPrice;
    departurePrice: TypeTicketTotalPrice;
  };
};

const initialState: TypeTiketsState = {
  tickets: {
    total_count: 0,
    items: [],
  },
  isLoading: false,
  lastTickets: [],
  ticket: null,
  totalPrice: {
    arrivalPrice: {
      adultPrice: 0,
      childPrice: 0,
      servicePrice: 0,
    },
    departurePrice: {
      adultPrice: 0,
      childPrice: 0,
      servicePrice: 0,
    },
  },
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
    setTicket: (state, action: PayloadAction<TypeTicket>) => {
      state.ticket = action.payload;
    },
    setTotalPrice: (
      state,
      action: PayloadAction<{
        price: TypeTicketTotalPrice;
        routePrice: "arrival" | "departure";
      }>
    ) => {
      const { price, routePrice } = action.payload;
      if (routePrice === "arrival") {
        state.totalPrice.arrivalPrice = price;
      } else {
        state.totalPrice.departurePrice = price;
      }
    },
  },
});

export const {
  setTikets,
  setIsLoading,
  setLastTickets,
  setTicket,
  setTotalPrice,
} = ticketsSlice.actions;

export default ticketsSlice.reducer;
