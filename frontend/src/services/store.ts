import { configureStore } from "@reduxjs/toolkit";

import ticketsReducer from "./tickets/ticketsSlice";
import filterReducer from "./filters/filtersSlice";
import seatReducer from "./seats/seatsSlice";
import passengersSlice from "./passengers/passengersSlice";

import { useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    tickets: ticketsReducer,
    filters: filterReducer,
    seats: seatReducer,
    passengers: passengersSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
