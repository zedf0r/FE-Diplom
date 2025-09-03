import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { FILTER_EDIT } from "./actions";

export type TypeFilters = {
  from_city_id: string;
  from_city_name: string;
  to_city_name: string;
  to_city_id: string;
} & TypeRouteDate &
  TypeRouteSort;

type TypeRouteSort = {
  have_first_class: boolean;
  have_second_class: boolean;
  have_third_class: boolean;
  have_fourth_class: boolean;
  have_wifi: boolean;
  is_express: boolean;
  sort: string;
  limit: string;
  offset: number;
  price_from: number;
  price_to: number;
};

type TypeRouteDate = {
  date_start?: string;
  date_end?: string;
  date_start_arrival?: string;
  date_end_arrival?: string;
  start_departure_hour_from: number;
  start_departure_hour_to: number;
  start_arrival_hour_from: number;
  start_arrival_hour_to: number;
  end_departure_hour_from: number;
  end_departure_hour_to: number;
  end_arrival_hour_from: number;
  end_arrival_hour_to: number;
};

interface InitialState {
  filters: TypeFilters;
}

const initialState: InitialState = {
  filters: {
    from_city_id: "",
    from_city_name: "",
    to_city_name: "",
    to_city_id: "",
    date_start: "",
    date_end: "",
    date_start_arrival: "",
    date_end_arrival: "",
    have_first_class: false,
    have_second_class: false,
    have_third_class: false,
    have_fourth_class: false,
    have_wifi: false,
    is_express: false,
    sort: "date",
    limit: "5",
    offset: 0,
    price_from: 0,
    price_to: 0,
    start_departure_hour_from: 0,
    start_departure_hour_to: 0,
    start_arrival_hour_from: 0,
    start_arrival_hour_to: 0,
    end_departure_hour_from: 0,
    end_departure_hour_to: 0,
    end_arrival_hour_from: 0,
    end_arrival_hour_to: 0,
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
