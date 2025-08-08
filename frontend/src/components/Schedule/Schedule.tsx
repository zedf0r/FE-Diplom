import classNames from "classnames";
import { ScheduleBox } from "../Icons";
import style from "./Schedule.module.css";

export const Schedule = ({
  title,
  reversed,
}: {
  title: string;
  reversed?: boolean;
}) => {
  return (
    <div className={style.schedule}>
      <div className={style.schedule__box}>
        <div
          className={classNames(style.box, { [style.box_reversed]: reversed })}
        >
          <ScheduleBox />
        </div>

        <h3 className={style.filter__title}>{title}</h3>
      </div>
      <div className={style.schedule__button}>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
