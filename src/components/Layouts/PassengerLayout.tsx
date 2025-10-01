import { Outlet } from "react-router";
import { DetailTripAside } from "../DetailTrip/DetailTripAside";
import style from "./PassengersLayot.module.css";

export const PassangerLayout = () => {
  return (
    <section>
      <div className="container">
        <div className={style.passenger}>
          <DetailTripAside />
          <Outlet />
        </div>
      </div>
    </section>
  );
};
