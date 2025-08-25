import type { TypeTicketRoute } from "../../types";
import { ArrowRightIcon } from "../Icons";
import style from "./CardRoutes.module.css";
import dayjs from "dayjs";

export const CardRoutes = ({
  departure,
  arrival,
}: {
  departure: TypeTicketRoute;
  arrival?: TypeTicketRoute;
}) => {
  return (
    <div className={style.card__route}>
      <div className={style.route}>
        <div className={style.route__textbox}>
          <span className={style.route__time}>
            {dayjs(departure.from.datetime * 1000).format("HH:MM")}
          </span>
          <span className={style.route__city}>{departure.from.city.name}</span>
          <span className={style.route__station}>
            {departure.from.railway_station_name}
          </span>
        </div>
        <div className={style.travel__time}>
          <span>{dayjs(departure.duration * 1000).format("HH:MM")}</span>
          <ArrowRightIcon />
        </div>
        <div className={style.route__textbox}>
          <span className={style.route__time}>
            {dayjs(departure.to.datetime * 1000).format("HH:MM")}
          </span>
          <span className={style.route__city}>{departure.to.city.name}</span>
          <span className={style.route__station}>
            {departure.to.railway_station_name}
          </span>
        </div>
      </div>
      {arrival ? (
        <div className={style.route__back}>
          <div className={style.route}>
            <div className={style.route__textbox}>
              <span className={style.route__time}>
                {dayjs(arrival.from.datetime * 1000).format("HH:MM")}
              </span>
              <span className={style.route__city}>
                {arrival.from.city.name}
              </span>
              <span className={style.route__station}>
                {arrival.from.railway_station_name}
              </span>
            </div>
            <div className={style.travel__time}>
              <span>9:42</span>
              <div className={style.arrow_reverse}>
                <ArrowRightIcon />
              </div>
            </div>
            <div className={style.route__textbox}>
              <span className={style.route__time}>
                {dayjs(arrival.to.datetime * 1000).format("HH:MM")}
              </span>
              <span className={style.route__city}>{arrival.to.city.name}</span>
              <span className={style.route__station}>
                {arrival.to.railway_station_name}
              </span>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
