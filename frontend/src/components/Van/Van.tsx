import { useState } from "react";
import type { TypeSeatsArray } from "../../types";
import style from "./Van.module.css";
import classNames from "classnames";
import { VanInfo } from "..";

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
        />
      )}

      {seatFiltering.map((seat, index) => {
        return (
          <>
            {activeVanIndex === index && (
              <>
                <div key={seat.coach._id} className={style.van__seats}>
                  <div className={style.van__seats_numerical}>
                    <span className={style.van__numerical__title}>
                      {index + 1}
                    </span>
                    <span className={style.van__numerical__text}>вагон</span>
                  </div>
                  <VanInfo seat={seat} />
                </div>
              </>
            )}
          </>
        );
      })}
    </>
  );
};

const VanNumber = ({
  vans,
  activeVanIndex,
  onClick,
}: {
  vans: TypeSeatsArray;
  activeVanIndex: number | null;
  onClick: (index: number) => void;
}) => {
  return (
    <div className={style.van__number}>
      <p className={style.van__number__count_title}>
        Вагоны{" "}
        {vans.map((van, index) => {
          return (
            <>
              <span
                key={van.coach._id}
                className={classNames(style.van__number__count_text, {
                  [style.van__count_text_active]: activeVanIndex === index,
                })}
                onClick={() => onClick(index)}
              >
                {index + 1}
              </span>{" "}
            </>
          );
        })}
      </p>
      <p className={style.van__number__count_text_small}>
        Нумерация вагонов начинается с головы поезда
      </p>
    </div>
  );
};
