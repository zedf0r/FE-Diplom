import { Filters, SeatSelectionCard } from "../../../../components";
import style from "./SeatSelectionScreen.module.css";

export const SeatSelectionScreen = () => {
  return (
    <div className="container">
      <section className={style.section}>
        <Filters />
        <SeatSelectionCard />
      </section>
    </div>
  );
};
