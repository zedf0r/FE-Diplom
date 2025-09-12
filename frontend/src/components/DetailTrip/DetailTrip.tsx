import { useState } from "react";
import { Direction } from "../Direction/Direction";
import style from "./DetailTrip.module.css";
import { useAppSelector } from "../../services/store";
import dayjs from "dayjs";
import classNames from "classnames";

export const DetailTrip = () => {
  const ticket = useAppSelector((state) => state.tickets.ticket);
  const [isActive, setIsActive] = useState({
    departure: false,
    arrival: false,
  });

  const handleOnClick = (route: "departure" | "arrival") => {
    setIsActive((prevState) => ({ ...prevState, [route]: !prevState[route] }));
  };
  return (
    <aside className={style.aside}>
      <h2 className={style.aside__title}>Детали поездки</h2>
      <div className={style.aside__trip}>
        <Direction
          title="Туда"
          isActive={isActive.departure}
          date={String(
            dayjs(
              ticket?.departure.from.datetime
                ? ticket?.departure.from.datetime * 1000
                : null
            ).format("DD.MM.YYYY")
          )}
          onClick={() => handleOnClick("departure")}
        />
        <div
          className={classNames(style.trip__info, {
            [style.trip__info_open]: isActive.departure,
          })}
        >
          <div className={style.info__train}>
            <div className={style.train__params}>
              <span className={style.train__params_text}>№ Поезда</span>
              <span className={style.train__params_name}>
                {ticket?.departure.train.name}
              </span>
            </div>
            <div className={style.train__params}>
              <span className={style.train__params_text}>Название</span>
              <div className={style.train__citis}>
                <span>{ticket?.departure.from.city.name}</span>
                <span>{ticket?.departure.to.city.name}</span>
              </div>
            </div>
          </div>
          <div className={style.info__route}>
            <div className={style.route}>
              <div className={style.route__datetime}>
                <span className={style.route__time}>
                  {dayjs(
                    ticket?.departure.from.datetime
                      ? ticket?.departure.from.datetime * 1000
                      : 0
                  ).format("HH:mm")}
                </span>
                <span className={style.route__date}>
                  {dayjs(
                    ticket?.departure.from.datetime
                      ? ticket?.departure.from.datetime * 1000
                      : 0
                  ).format("DD.MM.YY")}
                </span>
              </div>
              <div className={style.route__places}>
                <span className={style.route__city}>
                  {ticket?.departure.from.city.name}
                </span>
                <span className={style.route__station}>
                  {ticket?.departure.from.railway_station_name}
                </span>
              </div>
            </div>
            <div className={style.route__arrow}></div>
            <div className={style.route}></div>
          </div>
        </div>
      </div>
      {ticket?.arrival && (
        <div className={style.aside__trip}>
          <Direction
            title="Обратно"
            date={String(
              dayjs(ticket?.arrival?.from.datetime * 1000).format("DD.MM.YYYY")
            )}
            isActive={isActive.arrival}
            onClick={() => handleOnClick("arrival")}
            reversed
          />
        </div>
      )}
    </aside>
  );
};
