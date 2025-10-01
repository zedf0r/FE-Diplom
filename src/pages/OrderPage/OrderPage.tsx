import { useStepContext } from "@/hooks";
import { useEffect } from "react";
import { OrderScreen } from "./screen/OrderScreen";

const OrderPage = () => {
  const { handleSetValue } = useStepContext();

  useEffect(() => {
    handleSetValue(4);
  }, []);

  return <OrderScreen />;
};

export default OrderPage;
