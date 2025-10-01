import { Passengers } from "@/components";
import { useEffect } from "react";
import { useStepContext } from "@/hooks";

const PassengersPage = () => {
  const { handleSetValue } = useStepContext();

  useEffect(() => {
    handleSetValue(2);
  }, []);

  return <Passengers />;
};

export default PassengersPage;
