import { DetailTrip } from "../../../../components";
import style from "./PassangersScreen.module.css";

export const PassangersScreen = () => {
  return (
    <section className={style.passengers}>
      <div className="container">
        <div className={style.passengers__wrap}>
          <DetailTrip />
        </div>
      </div>
    </section>
  );
};
