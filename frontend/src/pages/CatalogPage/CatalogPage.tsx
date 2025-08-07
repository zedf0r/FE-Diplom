import { Catalog, Home } from "./screen";
import { Steps } from "../../components";

export const CatalogPage = () => {
  const steps = [
    { id: 1, title: "Билеты" },
    { id: 2, title: "Пассажиры" },
    { id: 3, title: "Оплата" },
    { id: 4, title: "Проверка" },
  ];
  return (
    <main>
      <Home />
      <Steps steps={steps} activeStep={1} />
      <Catalog />
    </main>
  );
};
