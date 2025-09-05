// import { SeatIcon } from "../Icons";
import style from "./Van.module.css";

export const Van = () => {
  // const services = [
  //   {
  //     service: "Сидячий",
  //     component: <SeatIcon size={{ width: "30", height: "50" }} />,
  //   },
  //   {
  //     service: "Плацкарт",
  //     component: <SeatIcon size={{ width: "50", height: "50" }} />,
  //   },
  //   {
  //     service: "Купе",
  //     component: <SeatIcon size={{ width: "50", height: "50" }} />,
  //   },
  //   {
  //     service: "Люкс",
  //     component: <SeatIcon size={{ width: "56", height: "50" }} />,
  //   },
  // ];

  return (
    <div className={style.van}>
      <h3 className={style.van__title}>Тип вагона</h3>
      <div className={style.van__service}>
        <div className={style.service}></div>
      </div>
    </div>
  );
};
