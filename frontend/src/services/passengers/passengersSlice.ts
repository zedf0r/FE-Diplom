import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const EDIT_PASSENGERS = "EDIT_PASSENGERS";

type TypePersonalInfo = {
  firstName: string;
  lastName: string;
  patronymic: string;
  sex: string;
  birthday: string;
  limitmobility: boolean;
  statusField: boolean;
};

type TypePersonalDocuments = {
  document: "passport" | "birthCertificate";
  serial: string;
  number: string;
  numberBirthCertificate: string;
};

export type TypePersonal = TypePersonalInfo &
  TypePersonalDocuments & { id: string; age: "Взрослый" | "Детский" };

interface InitialState {
  passengers: TypePersonal[];
}

const initialState: InitialState = {
  passengers: [],
};

export const passengersSlice = createSlice({
  name: EDIT_PASSENGERS,
  initialState,
  reducers: {
    setPassengers: (state, action: PayloadAction<TypePersonal>) => {
      state.passengers.push(action.payload);
    },
    updatePassengersInfo: (
      state,
      action: PayloadAction<{
        id: string;
        k: keyof TypePersonal;
        value: string | boolean;
      }>
    ) => {
      const passenger = state.passengers.find(
        (p) => p.id === action.payload.id
      );

      if (passenger) {
        (passenger[action.payload.k] as string | boolean) =
          action.payload.value;
      }
    },
  },
});

export const { setPassengers, updatePassengersInfo } = passengersSlice.actions;
export default passengersSlice.reducer;
