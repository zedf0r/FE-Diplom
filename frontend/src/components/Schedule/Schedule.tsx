import classNames from "classnames";
import { ScheduleBox } from "../Icons";
import { ScheduleSlider } from "../";
import style from "./Schedule.module.css";
import { useState } from "react";

export const Schedule = ({
  title,
  reversed,
}: {
  title: string;
  reversed?: boolean;
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
          <ScheduleSlider />
        </div>
        <div className={style.info__route}>
          <h3 className={style.route__text}>Время отбытия</h3>
          <ScheduleSlider />
        </div>
      </div>
    </div>
  );
};
