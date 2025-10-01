import { createContext } from "react";

type TypeStepContext = {
  value: number;
  handleSetValue: (num: number) => void;
};

export const StepContext = createContext<TypeStepContext | null>(null);
