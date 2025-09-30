import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const PAYMENT__ADDED = "PAYMENT__ADDED";

export type TypePaymentPersonalInfo = {
  lastName: string;
  firstName: string;
  patronomic: string;
  contactTelephone: string;
  email: string;
  paymentType: "online" | "cash" | "";
};

interface InitialState {
  payment: TypePaymentPersonalInfo;
}

const initialState: InitialState = {
  payment: {
    lastName: "",
    firstName: "",
    patronomic: "",
    contactTelephone: "",
    email: "",
    paymentType: "",
  },
};

export const paymentsSlice = createSlice({
  name: PAYMENT__ADDED,
  initialState,
  reducers: {
    setPaymentInfo: <K extends keyof TypePaymentPersonalInfo>(
      state: InitialState,
      action: PayloadAction<{ k: K; value: TypePaymentPersonalInfo[K] }>
    ) => {
      const { k, value } = action.payload;
      state.payment[k] = value;
    },
  },
});

export const { setPaymentInfo } = paymentsSlice.actions;
export default paymentsSlice.reducer;
