import { useState } from "react";
import type { TypeSeatsArray } from "../../types";
import style from "./Van.module.css";
import classNames from "classnames";
import { Seats, VanInfo } from "..";

export const Van = ({
  seats,
  activeType,
}: {
  seats?: TypeSeatsArray;
  activeType?: string;
}) => {
  const [activeVanIndex, setActiveVanIndex] = useState<number>(0);

  if (!seats) return null;

  const seatFiltering = seats?.filter(
    (seat) => seat.coach.class_type === activeType
  );

  const handleOnVanClick = (index: number) => {
    setActiveVanIndex(index);
  };

  return (
    <>
      {seatFiltering.length >= 1 && (
        <VanNumber
          vans={seatFiltering}
          activeVanIndex={activeVanIndex}
          onClick={handleOnVanClick}
          seats={seats}
        />
      )}

      {seatFiltering.map((seat, index) => {
        const globalIndex = String(seats.indexOf(seat) + 1).padStart(2, "0");

        return (
          activeVanIndex === index && (
            <div key={index} className={style.van}>
              <div key={seat.coach._id} className={style.van__seats}>
                <div className={style.van__seats_numerical}>
                  <span className={style.van__numerical__title}>
                    {globalIndex}
                  </span>
                  <span className={style.van__numerical__text}>вагон</span>
                </div>
                <VanInfo seat={seat} />
              </div>
              <div className={style.places}>
                <Seats places={seat} />
              </div>
            </div>
          )
        );
      })}
    </>
  );
};

const VanNumber = ({
  vans,
  activeVanIndex,
  seats,
  onClick,
}: {
  vans: TypeSeatsArray;
  seats: TypeSeatsArray;
  activeVanIndex: number | null;
  onClick: (index: number) => void;
}) => {
  return (
    <div className={style.van__number}>
      <div className={style.van__number__count_title}>
        Вагоны{" "}
        <div className={style.van__number_count}>
          {vans.map((van, index) => {
            const globalIndex = String(seats.indexOf(van) + 1).padStart(2, "0");

            return (
              <span
                key={van.coach._id}
                className={classNames(style.van__number__count_text, {
                  [style.van__count_text_active]: activeVanIndex === index,
                })}
                onClick={() => onClick(index)}
              >
                {globalIndex}
              </span>
            );
          })}
        </div>
      </div>
      <p className={style.van__number__count_text_small}>
        Нумерация вагонов начинается с головы поезда
      </p>
    </div>
  );
};
