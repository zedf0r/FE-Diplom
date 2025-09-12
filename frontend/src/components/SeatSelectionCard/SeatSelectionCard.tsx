import { useAppSelector } from "../../services/store";
import { Button, Route, CountTickets, VanType, Van } from "..";
import { ArrowRightIcon, ClockIcon, TrainIcon } from "../Icons";
import style from "./SeatSelectionCard.module.css";
import { useNavigate, useParams } from "react-router";
import { formatDuration } from "../../helper/formatDuration";
import { useEffect, useState } from "react";
import { fetchHelper } from "../../helper/fetchHelper";
import type { TypeSeatsArray } from "../../types";

export const SeatSelectionCard = () => {
  const [activeType, setActiveType] = useState<string | undefined>(undefined);
  const navigate = useNavigate();
  const ticket = useAppSelector((state) => state.tickets.ticket);
  const [seats, setSeats] = useState<TypeSeatsArray | undefined>(undefined);
  const [isloading, setIsLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    fetchHelper({ method: "GET", url: `/routes/${id}/seats` })
      .then((data) => {
        console.log(data);
        setSeats(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  const handleOnClick = () => {
    navigate(`/catalog/${id}/passengers`);
  };

  return (
    <div className={style.card}>
      <h3 className={style.card__title}>Выбор мест</h3>
      <div className={style.card__routes}>
        <div className={style.route}>
          <div className={style.buttons}>
            <Button
              onClick={() => console.log()}
              className="button__fill_small"
              type="button"
            >
              <ArrowRightIcon />
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
                  {ticket?.departure.train.name.includes("undefined")
                    ? "Не найден"
                    : ticket?.departure.train.name}
                </h3>
                <div className={style.card__train_route}>
                  <span>{ticket?.departure.from.city.name} &rarr;</span>
                  <span>{ticket?.departure.to.city.name}</span>
                </div>
              </div>
            </div>
            <div className={style.train__route}>
              <Route route={ticket?.departure} />
            </div>
            <div className={style.duration}>
              <ClockIcon size={{ width: "30", height: "30" }} />
              <div className={style.duration__text}>
                {formatDuration(ticket?.departure.duration ?? 0)}
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
              <Van seats={seats} activeType={activeType} />
            )}
          </div>
          <div className={style.card__total__price}>
            <span className={style.total__price_text}>8 080</span>
            <span className={style.total__price_valute}>₽</span>
          </div>
        </div>
      </div>
      <div className={style.card__button}>
        <Button
          onClick={handleOnClick}
          type="button"
          className="button__fill_white"
        >
          Далее
        </Button>
      </div>
    </div>
  );
};
