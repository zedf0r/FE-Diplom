import classNames from "classnames";
import style from "./Ticket.module.css";
import { ServiceIcon } from "../Icons";

type TypeTicketProps = {
  departureCity: string;
  departureStation: string;
  arrivalCity: string;
  arrivalStation: string;
  price: string;
};

export const Ticket = (props: TypeTicketProps) => {
  return (
    <article className={style.ticket}>
      <div className={style.ticket__trip}>
        <div className={style.ticket__textbox}>
          <span className={style.ticket__city}>{props.departureCity}</span>
          <span className={style.ticket__station}>
            {props.departureStation}
          </span>
        </div>
        <div className={style.ticket__textbox}>
          <span
            className={classNames(style.ticket__city, style.ticket__text_end)}
          >
            {props.arrivalCity}
          </span>
          <span
            className={classNames(
              style.ticket__station,
              style.ticket__text_end
            )}
          >
            {props.arrivalStation}
          </span>
        </div>
      </div>
      <div className={style.ticket__tariff}>
        <div className={style.service__svg}>
          <ServiceIcon />
        </div>
        <p className={style.ticket__price}>
          <span>от</span>
          <span className={style.ticket__text}>{props.price}</span>
          <span className={style.ticket__valute}>&#8381;</span>
        </p>
      </div>
    </article>
  );
};
