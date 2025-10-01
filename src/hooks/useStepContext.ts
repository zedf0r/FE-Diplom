import { StepContext } from "@/components";
import { useContext } from "react";

export const useStepContext = () => {
  const context = useContext(StepContext);

  if (!context) {
    throw new Error("Ошибка контекста");
  }

  return context;
};
