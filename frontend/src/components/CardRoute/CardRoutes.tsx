import classNames from "classnames";
import type { TypeTicket, TypeTicketRoute } from "../../types";
import { ArrowRightIcon } from "../Icons";
import style from "./CardRoutes.module.css";
import dayjs from "dayjs";

export const CardRoutes = ({ ticket }: { ticket: TypeTicket }) => {
  return (
    <div className={style.card__route}>
      <Route route={ticket.departure} duration />
      {ticket.arrival ? (
        <Route route={ticket.arrival} duration reverse />
      ) : null}
    </div>
  );
};

export const Route = ({
  route,
  reverse,
  duration,
}: {
  route?: TypeTicketRoute;
  reverse?: boolean;
  duration?: boolean;
}) => {
  return (
    <div className={style.route}>
      <div className={style.route__textbox}>
        <span className={style.route__time}>
          {dayjs(route?.to.datetime ? route?.to.datetime * 1000 : null).format(
            "HH:MM"
          )}
        </span>
        <span className={style.route__city}>{route?.from.city.name}</span>
        <span className={style.route__station}>
          {route?.from.railway_station_name}
        </span>
      </div>

      {duration ? (
        <div className={style.travel__time}>
          <span>
            {dayjs()
              .startOf("day")
              .add(route?.duration ? route?.duration : 0, "second")
              .format("HH:MM")}
          </span>
          <div
            className={classNames(style.arrow, {
              [style.arrow_reverse]: reverse,
            })}
          >
            <ArrowRightIcon />
          </div>
        </div>
      ) : (
        <div
          className={classNames(style.arrow, {
            [style.arrow_reverse]: reverse,
          })}
        >
          <ArrowRightIcon />
        </div>
      )}
      <div className={style.route__textbox}>
        <span className={style.route__time}>
          {dayjs(route?.to.datetime ? route?.to.datetime * 1000 : null).format(
            "HH:MM"
          )}
        </span>
        <span className={style.route__city}>{route?.to.city.name}</span>
        <span className={style.route__station}>
          {route?.to.railway_station_name}
        </span>
      </div>
    </div>
  );
};
