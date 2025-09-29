import { Outlet } from "react-router";
import { Steps } from "..";
import { Home } from "..";

export const CatalogLayout = ({ activeStep }: { activeStep: number }) => {
  const steps = [
    { id: 1, title: "Билеты" },
    { id: 2, title: "Пассажиры" },
    { id: 3, title: "Оплата" },
    { id: 4, title: "Проверка" },
  ];
  return (
    <main>
      <Home />
      <Steps steps={steps} activeStep={activeStep} />
      <Outlet />
    </main>
  );
};
