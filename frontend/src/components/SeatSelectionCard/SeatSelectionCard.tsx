import { useAppDispatch, useAppSelector } from "../../services/store";
import { Button, Route, CountTickets, VanType, Van } from "..";
import { ArrowRightIcon, ClockIcon, TrainIcon } from "../Icons";
import style from "./SeatSelectionCard.module.css";
import { useNavigate, useParams } from "react-router";
import { formatDuration } from "../../helper/formatDuration";
import { useEffect, useState } from "react";
import { fetchHelper } from "../../helper/fetchHelper";
import type { TypeSeatsArray, TypeTicket } from "../../types";
import { setTotalPrice } from "@/services/tickets/ticketsSlice";
import {
  TypeSelectedPlace,
  TypeSelectedService,
  TypeTicketParams,
} from "@/services/seats/seatsSlice";
import classNames from "classnames";

export const SeatSelectionCard = () => {
  const [isloading, setIsLoading] = useState(false);
  const [seats, setSeats] = useState<TypeSeatsArray | undefined>(undefined);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { ticket } = useAppSelector((state) => state.tickets);
  const { countTicketPlace, selectedPlace, selectedService } = useAppSelector(
    (state) => state.seats
  );

  const { id } = useParams();

  const calculatePrice = (
    places: TypeSelectedPlace[],
    countTicketPlace: TypeTicketParams[],
    services: TypeSelectedService[]
  ) => {
    const adultCount = Number(
      countTicketPlace.find((item) => item.age === "Взрослый" && item.seat)
        ?.count || 0
    );

    const childCount = Number(
      countTicketPlace.find((item) => item.age === "Детский" && item.seat)
        ?.count || 0
    );

    const adultPrice = places
      .slice(0, adultCount)
      .reduce((acc, item) => acc + item.price, 0);

    const childPrice =
      places
        .slice(adultCount, adultCount + childCount)
        .reduce((acc, item) => acc + item.price, 0) * 0.5;

    const servicePrice = services.reduce(
      (acc, service) => acc + (service.price ? service.price : 0),
      0
    );

    return { adultPrice, childPrice, servicePrice };
  };

  useEffect(() => {
    setIsLoading(true);
    fetchHelper({ method: "GET", url: `/routes/${id}/seats` })
      .then((data) => {
        setSeats(Array.isArray(data) ? data : data.seats ?? []);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  useEffect(() => {
    const departurePrice = calculatePrice(
      selectedPlace.departurePlace,
      countTicketPlace,
      selectedService.departureService
    );

    dispatch(
      setTotalPrice({
        price: departurePrice,
        routePrice: "departure",
      })
    );

    const arrivalPrice = calculatePrice(
      selectedPlace.arrivalPlace,
      countTicketPlace,
      selectedService.arrivalService
    );

    dispatch(
      setTotalPrice({
        price: arrivalPrice,
        routePrice: "arrival",
      })
    );
  }, [countTicketPlace, selectedPlace, selectedService]);

  const handleOnClick = () => {
    navigate(`/catalog/${id}/passengers`);
  };

  const maxCountTicket = countTicketPlace.reduce((acc, item) => {
    if (!item.seat) {
      return acc;
    }
    return acc + Number(item.count);
  }, 0);

  const className =
    maxCountTicket === selectedPlace.departurePlace.length &&
    (ticket?.arrival ? selectedPlace.arrivalPlace.length : true)
      ? "button__fill_white"
      : "button__nonactive";

  return (
    <div className={style.card}>
      <h3 className={style.card__title}>Выбор мест</h3>
      <RouteBox
        ticket={ticket}
        route="departure"
        seats={seats}
        isloading={isloading}
        selectedPlace={selectedPlace.departurePlace}
      />
      {ticket?.arrival ? (
        <RouteBox
          ticket={ticket}
          route="arrival"
          seats={seats}
          isloading={isloading}
          selectedPlace={selectedPlace.arrivalPlace}
        />
      ) : null}

      <div className={style.card__button}>
        <Button onClick={handleOnClick} type="button" className={className}>
          Далее
        </Button>
      </div>
    </div>
  );
};

const RouteBox = ({
  ticket,
  route,
  seats,
  isloading,
  selectedPlace,
}: {
  ticket: TypeTicket | null;
  route: "departure" | "arrival";
  seats?: TypeSeatsArray;
  isloading: boolean;
  selectedPlace: TypeSelectedPlace[];
}) => {
  const [activeType, setActiveType] = useState<string | undefined>(undefined);
  const { totalPrice } = useAppSelector((state) => state.tickets);

  const navigate = useNavigate();

  return (
    <div className={style.card__routes}>
      <div className={style.route}>
        <div
          className={classNames(style.buttons, {
            [style.buttons__reverse]: route === "arrival",
          })}
        >
          <Button className="button__fill_small" type="button">
            <div
              className={classNames({
                [style.reverse__svg]: route === "arrival",
              })}
            >
              <ArrowRightIcon />
            </div>
          </Button>
          <Button
            onClick={() => navigate(-1)}
            className="button__outline_big_black"
            type="button"
          >
            Выбрать другой поезд
          </Button>
        </div>
        <div className={style.route__train}>
          <div className={style.train}>
            <div className={style.card__sircle}>
              <TrainIcon size={{ width: "15", height: "18" }} />
            </div>
            <div className={style.train__info}>
              <h3 className={style.card__train_number}>
                {ticket?.[route]?.train.name.includes("undefined")
                  ? "Не найден"
                  : ticket?.departure.train.name}
              </h3>
              <div className={style.card__train_route}>
                <span>{ticket?.[route]?.from.city.name} &rarr;</span>
                <span>{ticket?.[route]?.to.city.name}</span>
              </div>
            </div>
          </div>
          <div className={style.train__route}>
            <Route route={ticket?.[route]} />
          </div>
          <div className={style.duration}>
            <ClockIcon size={{ width: "30", height: "30" }} />
            <div className={style.duration__text}>
              {formatDuration(ticket?.[route]?.duration ?? 0)}
            </div>
          </div>
        </div>
        <div className={style.card__tickets__variant}>
          <CountTickets />
        </div>
        <div>
          <VanType activeType={activeType} setActiveType={setActiveType} />
        </div>
        <div>
          {isloading ? (
            <div>Загрузка мест</div>
          ) : (
            <Van seats={seats} route={route} activeType={activeType} />
          )}
        </div>
        <div className={style.card__total__price}>
          {selectedPlace.length >= 1 && (
            <>
              <span className={style.total__price_text}>
                {(
                  totalPrice[`${route}Price`].adultPrice +
                  totalPrice[`${route}Price`].childPrice +
                  totalPrice[`${route}Price`].servicePrice
                ).toLocaleString()}
              </span>
              <span className={style.total__price_valute}>₽</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
