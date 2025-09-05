import { ServiceIcon } from "../Icons";
import style from "./Item.module.css";
import { Button, CardRoutes, CardTrainInfo, Tariff } from "..";
import type { TypeTicket } from "../../types";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../../services/store";
import { setTicket } from "../../services/tickets/ticketsSlice";

type TypeKeySeats = {
  first: string;
  second: string;
  third: string;
  fourth: string;
};

export const Item = ({ ticket }: { ticket: TypeTicket }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const tariffNames = {
    first: "Люкс",
    second: "Купе",
    third: "Плацкарт",
    fourth: "Сидячий",
  };

  const ticketSeats = Object.entries(ticket.available_seats_info);

  return (
    <article className={style.card}>
      <CardTrainInfo ticket={ticket} />
      <CardRoutes ticket={ticket} />
      <div className={style.card__tariffs}>
        {ticketSeats.map(([key, count]) => {
          return (
            <Tariff
              key={key}
              count={count}
              price={
                ticket.departure.price_info?.[key as keyof TypeKeySeats]
                  ?.bottom_price ||
                ticket.arrival?.price_info?.[key as keyof TypeKeySeats]
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
            onClick={() => {
              dispatch(setTicket(ticket));
              navigate(`${ticket.departure._id}`);
            }}
            type="button"
          >
            Выбрать места
          </Button>
        </div>
      </div>
    </article>
  );
};
