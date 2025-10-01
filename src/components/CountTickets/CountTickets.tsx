import style from "./CountTickets.module.css";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { setTicketCountPlace } from "../../services/seats/seatsSlice";
import type { TypeTicketParams } from "../../services/seats/seatsSlice";
import classNames from "classnames";

export const CountTickets = () => {
  const { countTicketPlace } = useAppSelector((state) => state.seats);

  return (
    <div className={style.count__tickets}>
      <h3 className={style.tickets__variant_title}>Количество билетов</h3>
      <div className={style.ticket}>
        {countTicketPlace.map((ticket, index) => {
          return <Count key={index} ticket={ticket} />;
        })}
      </div>
    </div>
  );
};

const Count = ({ ticket }: { ticket: TypeTicketParams }) => {
  const dispatch = useAppDispatch();

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(event.target.value) < 0) {
      return;
    }

    if (Number(event.target.value) > ticket.maxCount) {
      return;
    }

    dispatch(
      setTicketCountPlace({
        age: ticket.age,
        value: event.target.value,
        seat: ticket.seat,
      })
    );
  };

  const componentInfoDisplay = () => {
    if (ticket.age === "Взрослый") {
      return (
        <p className={style.ticket__info}>
          Можно добавить еще {ticket.maxCount - Number(ticket.count)} пассажиров
        </p>
      );
    }
    if (ticket.age === "Детский" && ticket.seat) {
      return (
        <p className={classNames(style.ticket__info, style.ticket__info_child)}>
          Можно добавить еще {ticket.maxCount - Number(ticket.count)} детей до
          10 лет. Свое место в вагоне, как у взрослых, но дешевле в среднем на
          50-65%
        </p>
      );
    }
  };

  return (
    <div
      className={classNames(style.tickets__box, {
        [style.tickets__box_shadow]: ticket.count !== "0",
      })}
    >
      <div className={style.count__box}>
        <span>
          {ticket.age} {!ticket.seat && "«без места»"} -
        </span>
        <input
          className={style.input}
          type="number"
          onChange={(event) => handleOnChange(event)}
          value={ticket.count}
        />
      </div>
      {componentInfoDisplay()}
    </div>
  );
};
