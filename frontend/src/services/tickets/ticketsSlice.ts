import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ADDED_PARAMS } from "./";

type TypeTicketsSearchParams = {
  departureCityID: string;
  departureDate: string;
  arrivalCityID: string;
  arrivalDate: string;
};

type TypeTicketsParams = {
  total_count: number;
  items: [];
};

type TypeTiketsState = {
  searchParams: TypeTicketsSearchParams;
  tickets: TypeTicketsParams;
  isLoading: boolean;
};

const initialState: TypeTiketsState = {
  searchParams: {
    departureCityID: "",
    departureDate: "",
    arrivalCityID: "",
    arrivalDate: "",
  },
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
    setDepartureCity: (state, action: PayloadAction<string>) => {
      state.searchParams.departureCityID = action.payload;
    },
    setArrivalCity: (state, action: PayloadAction<string>) => {
      state.searchParams.arrivalCityID = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setTikets, setDepartureCity, setArrivalCity, setIsLoading } =
  ticketsSlice.actions;

export default ticketsSlice.reducer;
