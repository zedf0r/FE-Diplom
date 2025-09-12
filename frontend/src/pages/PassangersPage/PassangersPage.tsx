import { Home, Steps } from "../../components";
import { PassangersScreen } from "./screen";

export const PassangersPage = () => {
  const steps = [
    { id: 1, title: "Билеты" },
    { id: 2, title: "Пассажиры" },
    { id: 3, title: "Оплата" },
    { id: 4, title: "Проверка" },
  ];
  return (
    <main>
      <Home />
      <Steps steps={steps} activeStep={2} />
      <PassangersScreen />
    </main>
  );
};
