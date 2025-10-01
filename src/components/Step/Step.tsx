import style from "./Step.module.css";
import classNames from "classnames";

export const Step = ({
  title,
  num,
  isActive,
  activeStep,
}: {
  title: string;
  num: number;
  isActive: boolean;
  activeStep: number;
}) => {
  const isCompleted = num < activeStep;
  return (
    <div
      className={classNames(style.list__item, {
        [style.list__item_active]: isActive,
        [style.list__item_selected]: isCompleted,
      })}
    >
      <div className={style.list__item_sircle}>
        <span className={style.list__item_position}>{num}</span>
      </div>
      <span className={style.list__item_title}>{title}</span>
    </div>
  );
};
