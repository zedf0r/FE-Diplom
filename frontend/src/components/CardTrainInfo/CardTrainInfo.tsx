import type { TypeTicket } from "../../types";
import { TrainIcon } from "../Icons";
import style from "./CardTrainInfo.module.css";

export const CardTrainInfo = ({ ticket }: { ticket: TypeTicket }) => {
  return (
    <div className={style.card__train}>
      <div className={style.card__sicle}>
        <TrainIcon size={{ width: "44", height: "52" }} />
      </div>
      <h3 className={style.card__train_number}>
        {ticket.departure.train.name.includes("undefined")
          ? "Не найден"
          : ticket.departure.train.name}
      </h3>
      <div className={style.card__train_route}>
        <span>{ticket.departure.from.city.name} &rarr;</span>
        <span>{ticket.departure.to.city.name}</span>
      </div>
    </div>
  );
};
