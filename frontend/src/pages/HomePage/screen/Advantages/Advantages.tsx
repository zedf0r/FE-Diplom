import style from "./Advantages.module.css";
import { Button } from "../../../components/";
import { MonitorIcon, OfficeIcon, WorldIcon } from "../../../components/Icons";

export const Advantages = () => {
  const handleClick = () => {};
  return (
    <section className={style.howitworks}>
      <div className="container">
        <div className={style.howitworks__content}>
          <div className={style.howitworks__header}>
            <h2 className={style.howitworks__title}>Как это работает</h2>
            <Button
              type="button"
              onClick={handleClick}
              className="button__outline_big"
            >
              Узнать больше
            </Button>
          </div>

          <ul className={style.list}>
            <li className={style.list__item}>
              <MonitorIcon />
              <span className={style.item__text}>Удобный заказ на сайте</span>
            </li>
            <li className={style.list__item}>
              <OfficeIcon />
              <span className={style.item__text}>
                Нет необходимости ехать в офис
              </span>
            </li>
            <li className={style.list__item}>
              <WorldIcon />
              <span className={style.item__text}>
                Огромный выбор направлений
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
