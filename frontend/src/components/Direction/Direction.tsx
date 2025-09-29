import classNames from "classnames";
import style from "./Direction.module.css";

export const Direction = ({
  title,
  reversed,
  isActive,
  date,
  children,
  onClick,
}: {
  title: string;
  isActive: boolean;
  children: React.ReactNode;
  reversed?: boolean;
  date?: string;
  onClick: () => void;
}) => {
  return (
    <div className={style.direction} onClick={onClick}>
      <div className={style.direction__box}>
        <div
          className={classNames(style.box, {
            [style.box_reversed]: reversed,
          })}
        >
          {children}
        </div>

        <h3 className={style.title}>{title}</h3>

        <span>{date}</span>
      </div>
      <div
        className={classNames(style.button, {
          [style.button_open]: isActive,
        })}
      >
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
