import classNames from "classnames";
import { Direction, ScheduleSlider } from "../";
import style from "./Schedule.module.css";
import type { TypeFilters } from "../../services/filters/filtersSlice";
import { ScheduleBox } from "../Icons";

export const Schedule = ({
  route,
  title,
  reversed,
  isActive,
  onClick,
  onChange,
}: {
  route?: string;
  title: string;
  reversed?: boolean;
  isActive: boolean;
  onClick: () => void;
  onChange: (
    keyFrom: keyof TypeFilters,
    keyTo: keyof TypeFilters,
    value: number[]
  ) => void;
}) => {
  return (
    <div className={style.schedule}>
      <Direction
        title={title}
        reversed={reversed}
        isActive={isActive}
        onClick={onClick}
      >
        <ScheduleBox />
      </Direction>
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
