import { ServiceIcon, TrainIcon } from "../Icons";
import style from "./Card.module.css";
import { Button, CardRoutes, Tariff } from "../../components";
import type { TypeTicket } from "../../types";

export const Card = ({ ticket }: { ticket: TypeTicket }) => {
  return (
    <article className={style.card}>
      <div className={style.card__train}>
        <div className={style.card__sicle}>
          <TrainIcon />
        </div>
        <h3 className={style.card__train_number}>
          {ticket.departure.train.name}
        </h3>
        <div className={style.card__train_route}>
          <span className={style.route__start}>Адлер &rarr;</span>
          <span>Москва &rarr;</span>
          <span>Санкт-Петербург</span>
        </div>
      </div>
      <CardRoutes departure={ticket.departure} arrival={ticket.arrival} />
      <div className={style.card__tariffs}>
        <Tariff variant="Сидячий" count="88" price="1 920" />
        <Tariff variant="Плацкарт" count="52" price="2 530" />
        <Tariff variant="Купе" count="24" price="3 820" />
        <Tariff variant="Люкс" count="15" price="4 950" />
        <div className={style.tariff__service}>
          <div className={style.serice__svg}>
            <ServiceIcon />
          </div>
          <Button
            className="button__fill_small"
            onClick={() => {}}
            type="button"
          >
            Выбрать места
          </Button>
        </div>
      </div>
    </article>
  );
};
