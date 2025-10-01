import { useState } from "react";
import { Direction } from "../Direction/Direction";
import style from "./DetailTripAside.module.css";
import { useAppSelector } from "../../services/store";
import dayjs from "dayjs";
import classNames from "classnames";
import type { TypeTicket, TypeTicketTrip } from "../../types";
import { ArrowRightIcon, PassengerIcon, ScheduleBox } from "../Icons";

type TypeRoute = {
  departure: boolean;
  arrival: boolean;
  passengers: boolean;
};

export const DetailTripAside = () => {
  const { totalPrice, ticket } = useAppSelector((state) => state.tickets);
  const { countTicketPlace } = useAppSelector((state) => state.seats);

  const [isActive, setIsActive] = useState({
    departure: false,
    arrival: false,
    passengers: false,
  });

  const handleOnClick = (route: "departure" | "arrival" | "passengers") => {
    setIsActive((prevState) => ({ ...prevState, [route]: !prevState[route] }));
  };

  const adultCount = Number(
    countTicketPlace.find((item) => item.age === "Взрослый" && item.seat)
      ?.count ?? 0
  );

  const childCount = Number(
    countTicketPlace.find((item) => item.age === "Детский" && item.seat)
      ?.count ?? 0
  );

  const adultTotalPrice =
    totalPrice.departurePrice.adultPrice + totalPrice.arrivalPrice.adultPrice;
  const childTotalPrice =
    totalPrice.departurePrice.childPrice + totalPrice.arrivalPrice.childPrice;
  const serviceTotalPrice =
    totalPrice.arrivalPrice.servicePrice +
    totalPrice.departurePrice.servicePrice;

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
        >
          <ScheduleBox />
        </Direction>
        <TripInfo route="departure" isActive={isActive}>
          {<TripInfoRoute ticket={ticket} route="departure" />}
        </TripInfo>
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
          >
            <ScheduleBox />
          </Direction>
          <TripInfo route="arrival" isActive={isActive}>
            {<TripInfoRoute ticket={ticket} route="arrival" />}
          </TripInfo>
        </div>
      )}
      <div className={style.passengers}>
        <Direction
          title="Пассажиры"
          isActive={isActive.passengers}
          onClick={() => handleOnClick("passengers")}
        >
          <div className={style.passengers__svg}>
            <PassengerIcon />
          </div>
        </Direction>
        <TripInfo route="passengers" isActive={isActive}>
          <div className={style.passengers__count}>
            {adultCount > 0 && (
              <div className={style.passenger}>
                <p className={style.passenger__age}>
                  {adultCount === 1
                    ? ` ${adultCount} Взрослый`
                    : ` ${adultCount} Взрослых`}
                </p>
                <p className={style.passenger__price}>
                  {adultTotalPrice.toLocaleString()}{" "}
                  <span className={style.passenger__valute}>₽</span>
                </p>
              </div>
            )}
            {childCount > 0 && (
              <div className={style.passenger}>
                <p className={style.passenger__age}>
                  {childCount === 1
                    ? `${childCount} Ребенок`
                    : `${childCount} Ребенка`}
                </p>
                <p className={style.passenger__price}>
                  {childTotalPrice.toLocaleString()}{" "}
                  <span className={style.passenger__valute}>₽</span>
                </p>
              </div>
            )}
          </div>
        </TripInfo>
      </div>
      <div className={style.passenger__total}>
        <p className={style.passenger__total__text}>Итог</p>
        <p className={style.passenger__total__price}>
          {(
            childTotalPrice +
            adultTotalPrice +
            serviceTotalPrice
          ).toLocaleString()}{" "}
          <span className={style.passenger__total__valute}>₽</span>
        </p>
      </div>
    </aside>
  );
};

const TripInfo = ({
  route,
  isActive,
  children,
}: {
  route: keyof TypeRoute;
  isActive: TypeRoute;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={classNames(style.trip__info, {
        [style.trip__info_open]: isActive[route],
      })}
    >
      {children}
    </div>
  );
};

const TripInfoRoute = ({
  ticket,
  route,
}: {
  ticket: TypeTicket | null;
  route: keyof TypeTicketTrip;
}) => {
  return (
    <>
      <div className={style.info__train}>
        <div className={style.train__params}>
          <span className={style.train__params_text}>№ Поезда</span>
          <span className={style.train__params_name}>
            {ticket?.[route]?.train.name}
          </span>
        </div>
        <div className={style.train__params}>
          <span className={style.train__params_text}>Название</span>
          <div className={style.train__citis}>
            <span>{ticket?.[route]?.from.city.name}</span>
            <span>{ticket?.[route]?.to.city.name}</span>
          </div>
        </div>
      </div>

      <div className={style.info__route}>
        <Route ticket={ticket} route="departure" way="from" />
        <div className={style.route__arrow}>
          <span>
            {dayjs()
              .startOf("day")
              .add(ticket?.[route]?.duration ?? 0, "second")
              .format("HH:mm")}
          </span>
          <ArrowRightIcon />
        </div>
        <Route ticket={ticket} route="departure" way="to" rightPosition />
      </div>
    </>
  );
};

const Route = ({
  ticket,
  route,
  way,
  rightPosition,
}: {
  ticket: TypeTicket | null;
  route: keyof TypeTicketTrip;
  way: "from" | "to";
  rightPosition?: boolean;
}) => {
  return (
    <div className={style.route}>
      <div className={style.route__datetime}>
        <span className={style.route__time}>
          {dayjs(
            ticket?.[route]?.[way].datetime
              ? ticket?.[route]?.[way].datetime * 1000
              : 0
          ).format("HH:mm")}
        </span>
        <span className={style.route__date}>
          {dayjs(
            ticket?.[route]?.[way].datetime
              ? ticket?.[route]?.[way].datetime * 1000
              : 0
          ).format("DD.MM.YY")}
        </span>
      </div>
      <div
        className={classNames(style.route__places, {
          [style.route__places_right]: rightPosition,
        })}
      >
        <span className={style.route__city}>
          {ticket?.[route]?.[way].city.name}
        </span>
        <span className={style.route__station}>
          {ticket?.[route]?.[way].railway_station_name}
        </span>
      </div>
    </div>
  );
};
