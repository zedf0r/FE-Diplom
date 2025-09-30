import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const ADDED_COUNT_TICKET = "ADDED_COUNT_TICKET";

interface InitialState {
  countTicketPlace: TypeTicketParams[];
  selectedPlace: {
    arrivalPlace: TypeSelectedPlace[];
    departurePlace: TypeSelectedPlace[];
  };
  selectedService: {
    arrivalService: TypeSelectedService[];
    departureService: TypeSelectedService[];
  };
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
  selectedPlace: {
    arrivalPlace: [],
    departurePlace: [],
  },
  selectedService: {
    arrivalService: [],

    departureService: [],
  },
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
    toggleSeat: (
      state,
      action: PayloadAction<{
        seat: TypeSelectedPlace;
        route: "arrival" | "departure";
      }>
    ) => {
      const { seat, route } = action.payload;

      const targetArray =
        route === "arrival"
          ? state.selectedPlace.arrivalPlace
          : state.selectedPlace.departurePlace;

      const prevItem = targetArray.some(
        (s) => s._id === seat._id && s.index === seat.index
      );

      const countsTicket = state.countTicketPlace.reduce(
        (acc, count) => acc + (count.seat ? Number(count.count) : 0),
        0
      );

      if (prevItem) {
        if (route === "arrival") {
          state.selectedPlace.arrivalPlace = targetArray.filter(
            (s) => !(s._id === seat._id && s.index === seat.index)
          );
        } else {
          state.selectedPlace.departurePlace = targetArray.filter(
            (s) => !(s._id === seat._id && s.index === seat.index)
          );
        }
      } else {
        if (targetArray.length < countsTicket)
          if (route === "arrival") {
            state.selectedPlace.arrivalPlace.push(seat);
          } else {
            state.selectedPlace.departurePlace.push(seat);
          }
      }
    },
    toggleService: (
      state,
      action: PayloadAction<{
        selectedService: TypeSelectedService;
        route: "departure" | "arrival";
      }>
    ) => {
      const { selectedService, route } = action.payload;

      const targetArray =
        route === "arrival"
          ? state.selectedService.arrivalService
          : state.selectedService.departureService;

      const prevItem = targetArray.some(
        (service) =>
          service._id === selectedService._id &&
          service.service === selectedService.service
      );

      if (prevItem) {
        if (route === "arrival") {
          state.selectedService.arrivalService = targetArray.filter(
            (seat) =>
              !(
                seat._id === selectedService._id &&
                seat.service === selectedService.service
              )
          );
        } else {
          state.selectedService.departureService = targetArray.filter(
            (seat) =>
              !(
                seat._id === selectedService._id &&
                seat.service === selectedService.service
              )
          );
        }
      } else {
        if (route === "arrival") {
          state.selectedService.arrivalService.push(selectedService);
        } else {
          state.selectedService.departureService.push(selectedService);
        }
      }
    },
  },
});

export const { setTicketCountPlace, toggleSeat, toggleService } =
  seatSlice.actions;

export default seatSlice.reducer;
