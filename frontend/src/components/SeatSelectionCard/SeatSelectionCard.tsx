import { useAppSelector } from "../../services/store";
import { Button, Route, CountTickets, Van } from "..";
import { ArrowRightIcon, ClockIcon, TrainIcon } from "../Icons";
import style from "./SeatSelectionCard.module.css";
import { useNavigate } from "react-router";
import { formatDuration } from "../../helper/formatDuration";

export const SeatSelectionCard = () => {
  const navigate = useNavigate();
  const ticket = useAppSelector((state) => state.tickets.ticket);
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
                {formatDuration(
                  ticket?.departure.duration ? ticket.departure.duration : 0
                )}
              </div>
            </div>
          </div>
          <div className={style.card__tickets__variant}>
            <CountTickets />
          </div>
          <div className={style.card__type_van}>
            <Van />
          </div>
        </div>
      </div>
    </div>
  );
};
