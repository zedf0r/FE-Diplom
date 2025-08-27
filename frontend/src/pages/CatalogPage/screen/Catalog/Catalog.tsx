import classNames from "classnames";
import { Card, Filter } from "../../../../components";
import { useAppSelector } from "../../../../services/store";
import type { TypeTicket } from "../../../../types";
import style from "./Catalog.module.css";
import { Pagination } from "antd";

export const Catalog = () => {
  const { isLoading, tickets } = useAppSelector((state) => state.tickets);

  return (
    <section className={style.catalog}>
      <div className={style.catalog__container}>
        <Filter />
        <div className={style.cards}>
          <div className={style.header__cards}>
            <span className={style.header__text}>
              найдено {tickets.total_count}
            </span>
            <div className={style.cards__filter}>
              <div className={style.filter__sort}>
                <span className={style.header__text}>
                  сортировать по:{" "}
                  {
                    <select className={style.filter__select}>
                      <option
                        className={style.select__option}
                        value="timeOption"
                      >
                        времени
                      </option>
                      <option
                        className={style.select__option}
                        value="priceOption"
                      >
                        стоимости
                      </option>
                      <option
                        className={style.select__option}
                        value="durationOption"
                      >
                        длительности
                      </option>
                    </select>
                  }
                </span>
              </div>
              <div className={style.filter__count}>
                <span className={style.header__text}>показывать по:</span>
                <span
                  className={classNames(
                    style.filter__count_choose,
                    style.filter__count_active
                  )}
                >
                  5
                </span>
                <span className={style.filter__count_choose}>10</span>
                <span className={style.filter__count_choose}>20</span>
              </div>
            </div>
          </div>
          {isLoading
            ? "Загрузка"
            : tickets.items?.map((ticket: TypeTicket) => {
                return (
                  <Card key={ticket.departure.train._id} ticket={ticket} />
                );
              })}
          <Pagination align="end" defaultCurrent={1} total={50} />
        </div>
      </div>
    </section>
  );
};
