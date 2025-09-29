import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const ADDED_COUNT_TICKET = "ADDED_COUNT_TICKET";

interface InitialState {
  countTicketPlace: TypeTicketParams[];
  selectedPlace: TypeSelectedPlace[];
  selectedService: TypeSelectedService[];
}

export type TypeTicketParams = {
  age: TypeAge;
  count: string;
  seat: boolean;
  maxCount: number;
};

export type TypeSelectedPlace = {
  _id: string;
  index: number;
  class_type: string;
  price: number;
};

export type TypeSelectedService = {
  _id: string;
  service: string;
  price?: number;
};

type TypeAge = "Взрослый" | "Детский";

const initialState: InitialState = {
  countTicketPlace: [
    { age: "Взрослый", count: "2", seat: true, maxCount: 5 },
    { age: "Детский", count: "0", seat: true, maxCount: 4 },
    { age: "Детский", count: "0", seat: false, maxCount: 2 },
  ],
  selectedPlace: [],
  selectedService: [],
};

export const seatSlice = createSlice({
  name: ADDED_COUNT_TICKET,
  initialState,
  reducers: {
    setTicketCountPlace: (
      state,
      action: PayloadAction<{ age: TypeAge; value: string; seat: boolean }>
    ) => {
      const { age, value, seat } = action.payload;

      state.countTicketPlace.map((item) => {
        if (item.age === age && item.seat === seat) {
          return (item.count = value);
        }
        return value;
      });
    },
    toggleSeat: (state, action: PayloadAction<TypeSelectedPlace>) => {
      const prevItem = state.selectedPlace.some(
        (seat) =>
          seat._id === action.payload._id && seat.index === action.payload.index
      );

      const countsTicket = state.countTicketPlace.reduce(
        (acc, count) => acc + (count.seat ? Number(count.count) : 0),
        0
      );

      if (prevItem) {
        state.selectedPlace = state.selectedPlace.filter(
          (seat) =>
            !(
              seat._id === action.payload._id &&
              seat.index === action.payload.index
            )
        );
      } else {
        if (state.selectedPlace.length < countsTicket)
          state.selectedPlace.push(action.payload);
      }
    },
    toggleService: (state, action: PayloadAction<TypeSelectedService>) => {
      const prevItem = state.selectedService.some(
        (service) =>
          service._id === action.payload._id &&
          service.service === action.payload.service
      );

      if (prevItem) {
        state.selectedService = state.selectedService.filter(
          (seat) =>
            !(
              seat._id === action.payload._id &&
              seat.service === action.payload.service
            )
        );
      } else {
        state.selectedService.push(action.payload);
      }
    },
  },
});

export const { setTicketCountPlace, toggleSeat, toggleService } =
  seatSlice.actions;

export default seatSlice.reducer;
