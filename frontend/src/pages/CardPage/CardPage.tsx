import { Filters, SeatSelectionCard } from "@/components";
import style from "./CardPage.module.css";
import { useStepContext } from "@/hooks";
import { useEffect } from "react";

const CardPage = () => {
  const { handleSetValue } = useStepContext();

  useEffect(() => {
    handleSetValue(1);
  }, []);

  return (
    <div className="container">
      <section className={style.section}>
        <Filters />
        <SeatSelectionCard />
      </section>
    </div>
  );
};

export default CardPage;
