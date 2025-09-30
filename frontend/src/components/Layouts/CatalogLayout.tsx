import { Outlet } from "react-router";
import { Steps, Home } from "@/components";
import { useStepContext } from "@/hooks";

export const CatalogLayout = () => {
  const { value } = useStepContext();

  const steps = [
    { id: 1, title: "Билеты" },
    { id: 2, title: "Пассажиры" },
    { id: 3, title: "Оплата" },
    { id: 4, title: "Проверка" },
  ];

  return (
    <main>
      <Home />
      <Steps steps={steps} activeStep={value} />
      <Outlet />
    </main>
  );
};
