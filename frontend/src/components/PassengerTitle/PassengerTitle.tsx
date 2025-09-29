import classNames from "classnames";
import style from "./PassengerTitle.module.css";

export const PassengerTitle = ({
  title,
  isActive,
  handleOnClick,
}: {
  title: string;
  isActive?: boolean;
  handleOnClick?: () => void;
}) => {
  return (
    <div className={style.passenger__number}>
      <div className={style.number__text}>
        <div
          className={classNames(style.number__circle, {
            [style.number__cicle_active]: isActive,
          })}
          onClick={handleOnClick}
        >
          <div></div>
          <div></div>
        </div>
        <p>{title}</p>
      </div>

      <div
        className={classNames(style.number__close, {
          [style.number__close_active]: isActive,
        })}
        onClick={handleOnClick}
      >
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
