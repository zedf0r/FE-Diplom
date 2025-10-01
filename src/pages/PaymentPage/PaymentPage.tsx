import { useStepContext } from "@/hooks";
import { useEffect } from "react";
import { PaymentScreen } from "./screen/PaymentScreen";

const PaymentPage = () => {
  const { handleSetValue } = useStepContext();

  useEffect(() => {
    handleSetValue(3);
  }, []);

  return <PaymentScreen />;
};

export default PaymentPage;
