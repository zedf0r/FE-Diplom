import classNames from "classnames";
import style from "./Ticket.module.css";
import { ServiceIcon } from "../Icons";
import type { TypeTicket } from "../../types";

export const Ticket = (props: TypeTicket) => {
  return (
    <article className={style.ticket}>
      <div className={style.ticket__trip}>
        <div className={style.ticket__textbox}>
          <span className={style.ticket__city}>
            {props.departure.from.city.name}
          </span>
          <span className={style.ticket__station}>
            {props.departure.from.railway_station_name}
          </span>
        </div>
        <div className={style.ticket__textbox}>
          <span
            className={classNames(style.ticket__city, style.ticket__text_end)}
          >
            {props.departure.to.city.name}
          </span>
          <span
            className={classNames(
              style.ticket__station,
              style.ticket__text_end
            )}
          >
            {props.departure.to.railway_station_name}
          </span>
        </div>
      </div>
      <div className={style.ticket__tariff}>
        <div className={style.service__svg}>
          <ServiceIcon />
        </div>
        <p className={style.ticket__price}>
          <span>от</span>
          <span className={style.ticket__text}>
            {props.departure.min_price}
          </span>
          <span className={style.ticket__valute}>&#8381;</span>
        </p>
      </div>
    </article>
  );
};
