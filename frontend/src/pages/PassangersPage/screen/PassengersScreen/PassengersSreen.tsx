import { DetailTripAside, Passengers } from "../../../../components";
import style from "./PassangersScreen.module.css";

export const PassengersScreen = () => {
  return (
    <section className={style.passengers}>
      <div className="container">
        <div className={style.passengers__wrap}>
          <DetailTripAside />
          <Passengers />
        </div>
      </div>
    </section>
  );
};
