import { ServiceIcon, TrainIcon } from "../Icons";
import style from "./Card.module.css";
import { Button, CardRoutes, Tariff } from "../../components";
import type { TypeTicket } from "../../types";

type TypeKeySeats = {
  first: string;
  second: string;
  third: string;
  fourth: string;
};

export const Card = ({ ticket }: { ticket: TypeTicket }) => {
  const tariffNames = {
    first: "Люкс",
    second: "Купе",
    third: "Плацкарт",
    fourth: "Сидячий",
  };

  const ticketSeats = Object.entries(ticket.available_seats_info);

  return (
    <article className={style.card}>
      <div className={style.card__train}>
        <div className={style.card__sicle}>
          <TrainIcon />
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
      <CardRoutes departure={ticket.departure} arrival={ticket.arrival} />
      <div className={style.card__tariffs}>
        {ticketSeats.map(([key, count]) => {
          return (
            <Tariff
              key={key}
              count={count}
              price={
                ticket.departure.price_info?.[key as keyof TypeKeySeats]
                  ?.bottom_price
              }
              variant={tariffNames?.[key as keyof TypeKeySeats]}
            />
          );
        })}
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
