import { ReactNode, useCallback, useState } from "react";
import { StepContext } from "@/components";

export const StepProvider = ({ children }: { children: ReactNode }) => {
  const [value, setValue] = useState(1);

  const handleSetValue = useCallback((num: number) => {
    setValue(num);
  }, []);
  return (
    <StepContext.Provider value={{ value, handleSetValue }}>
      {children}
    </StepContext.Provider>
  );
};
