import { ArrowRightIcon, ServiceIcon, TrainIcon } from "../Icons";
import style from "./Card.module.css";
import { Button, Tariff } from "../../components";

export const Card = () => {
  return (
    <article className={style.card}>
      <div className={style.card__train}>
        <div className={style.card__sicle}>
          <TrainIcon />
        </div>
        <h3 className={style.card__train_number}>116C</h3>
        <div className={style.card__train_route}>
          <span className={style.route__start}>Адлер &rarr;</span>
          <span>Москва &rarr;</span>
          <span>Санкт-Петербург</span>
        </div>
      </div>
      <div className={style.card__route}>
        <div className={style.route}>
          <div className={style.route__textbox}>
            <span className={style.route__time}>00:10</span>
            <span className={style.route__city}>Москва</span>
            <span className={style.route__station}>Курский вокзал</span>
          </div>
          <div className={style.travel__time}>
            <span>9:42</span>
            <ArrowRightIcon />
          </div>
          <div className={style.route__textbox}>
            <span className={style.route__time}>09:52</span>
            <span className={style.route__city}>Санкт-Петербург</span>
            <span className={style.route__station}>Ладожский вокзал</span>
          </div>
        </div>
        <div className={style.route__back}>
          <div className={style.route}>
            <div className={style.route__textbox}>
              <span className={style.route__time}>00:10</span>
              <span className={style.route__city}>Москва</span>
              <span className={style.route__station}>Курский вокзал</span>
            </div>
            <div className={style.travel__time}>
              <span>9:42</span>
              <div className={style.arrow_reverse}>
                <ArrowRightIcon />
              </div>
            </div>
            <div className={style.route__textbox}>
              <span className={style.route__time}>09:52</span>
              <span className={style.route__city}>Санкт-Петербург</span>
              <span className={style.route__station}>Ладожский вокзал</span>
            </div>
          </div>
        </div>
      </div>
      <div className={style.card__tariffs}>
        <Tariff variant="Сидячий" count="88" price="1 920" />
        <Tariff variant="Плацкарт" count="52" price="2 530" />
        <Tariff variant="Купе" count="24" price="3 820" />
        <Tariff variant="Люкс" count="15" price="4 950" />
        <div className={style.tariff__service}>
          <div className={style.serice__svg}>
            <ServiceIcon />
          </div>
          <Button
            className="button__fill_small"
            onClick={() => {}}
            type="button"
          >
            Выбрать места
          </Button>
        </div>
      </div>
    </article>
  );
};
