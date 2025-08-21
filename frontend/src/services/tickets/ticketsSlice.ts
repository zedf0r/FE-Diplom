import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ADDED_PARAMS } from "./";

type TypeTicketsCityParams = {
  city: string;
  id: string;
};

type TypeTicketsSearchParams = {
  departureCity: TypeTicketsCityParams;
  departureDate: string;
  arrivalCity: TypeTicketsCityParams;
  arrivalDate: string;
};

type TypeTiketsState = {
  searchParams: TypeTicketsSearchParams;
  tickets: [];
};

const initialState: TypeTiketsState = {
  searchParams: {
    departureCity: {
      city: "",
      id: "",
    },
    departureDate: "",
    arrivalCity: {
      city: "",
      id: "",
    },
    arrivalDate: "",
  },
  tickets: [],
};

export const ticketsSlice = createSlice({
  name: ADDED_PARAMS,
  initialState,
  reducers: {
    setSearchParams: (
      state,
      action: PayloadAction<TypeTicketsSearchParams>
    ) => {
      state.searchParams = { ...state, ...action.payload };
    },
    setDepartureCity: (state, action: PayloadAction<TypeTicketsCityParams>) => {
      state.searchParams.departureCity = action.payload;
    },
    setArrivalCity: (state, action: PayloadAction<TypeTicketsCityParams>) => {
      state.searchParams.arrivalCity = action.payload;
    },
  },
});

export const { setSearchParams, setDepartureCity, setArrivalCity } =
  ticketsSlice.actions;

export default ticketsSlice.reducer;
