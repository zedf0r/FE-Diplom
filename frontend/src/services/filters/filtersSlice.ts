import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { FILTER_EDIT } from "./actions";

type TypeFilters = {
  from_city_id: string;
  departureDate: string;
  to_city_id: string;
  arrivalDate: string;
  startDate: string;
  endDate: string;
  first: boolean;
  second: boolean;
  third: boolean;
  fourth: boolean;
  wifi: boolean;
  express: boolean;
  sort: string;
  limit: string;
};

interface InitialState {
  filters: TypeFilters;
}

const initialState: InitialState = {
  filters: {
    from_city_id: "",
    departureDate: "",
    to_city_id: "",
    arrivalDate: "",
    startDate: "",
    endDate: "",
    first: false,
    second: false,
    third: false,
    fourth: false,
    wifi: false,
    express: false,
    sort: "date",
    limit: "5",
  },
};

const filtersSlice = createSlice({
  name: FILTER_EDIT,
  initialState,
  reducers: {
    onChangeFilter: <K extends keyof TypeFilters>(
      state: InitialState,
      action: PayloadAction<{ key: K; value: TypeFilters[K] }>
    ) => {
      const { key, value } = action.payload;
      state.filters[key] = value;
    },
  },
});

export const { onChangeFilter } = filtersSlice.actions;

export default filtersSlice.reducer;
