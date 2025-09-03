import classNames from "classnames";
import { ScheduleBox } from "../Icons";
import { ScheduleSlider } from "../";
import style from "./Schedule.module.css";
import { useState } from "react";
import type { TypeFilters } from "../../services/filters/filtersSlice";

export const Schedule = ({
  title,
  reversed,
  route,
  onChange,
}: {
  title: string;
  reversed?: boolean;
  route?: string;
  onChange: (
    keyFrom: keyof TypeFilters,
    keyTo: keyof TypeFilters,
    value: number[]
  ) => void;
}) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={style.schedule}>
      <div
        className={style.schedule__inner}
        onClick={() => setIsActive((prevState) => !prevState)}
      >
        <div className={style.schedule__box}>
          <div
            className={classNames(style.box, {
              [style.box_reversed]: reversed,
            })}
          >
            <ScheduleBox />
          </div>

          <h3 className={style.filter__title}>{title}</h3>
        </div>
        <div
          className={classNames(style.schedule__button, {
            [style.schedule__button_open]: isActive,
          })}
        >
          <div></div>
          <div></div>
        </div>
      </div>
      <div
        className={classNames(style.schedule__info, {
          [style.schedule__info_open]: isActive,
        })}
      >
        <div className={style.info__route}>
          <h3 className={style.route__text}>Время отбытия</h3>
          <ScheduleSlider
            onChange={(value) =>
              route === "departure"
                ? onChange(
                    "start_departure_hour_from",
                    "start_departure_hour_to",
                    value
                  )
                : onChange(
                    "end_departure_hour_from",
                    "end_departure_hour_to",
                    value
                  )
            }
          />
        </div>
        <div className={style.info__route}>
          <h3
            className={classNames(style.route__text, style.route__text_right)}
          >
            Время прибытия
          </h3>
          <ScheduleSlider
            onChange={(value) =>
              route === "departure"
                ? onChange(
                    "start_arrival_hour_from",
                    "start_arrival_hour_to",
                    value
                  )
                : onChange(
                    "end_arrival_hour_from",
                    "end_arrival_hour_to",
                    value
                  )
            }
          />
        </div>
      </div>
    </div>
  );
};
