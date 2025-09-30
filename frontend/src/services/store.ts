import { configureStore } from "@reduxjs/toolkit";

import ticketsReducer from "./tickets/ticketsSlice";
import filterReducer from "./filters/filtersSlice";
import seatReducer from "./seats/seatsSlice";
import passengersReduce from "./passengers/passengersSlice";
import paymentsReduce from "./payments/paymentsSlice";

import { useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    tickets: ticketsReducer,
    filters: filterReducer,
    seats: seatReducer,
    passengers: passengersReduce,
    payments: paymentsReduce,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
