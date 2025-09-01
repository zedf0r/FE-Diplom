import classNames from "classnames";
import { Card, Filter } from "../../../../components";
import { useAppDispatch, useAppSelector } from "../../../../services/store";
import type { TypeTicket } from "../../../../types";
import style from "./Catalog.module.css";
import { Pagination } from "antd";
import { onChangeFilter } from "../../../../services/filters/filtersSlice";
import { fetchHelper } from "../../../../helper/fetchHelper";
import { setTikets } from "../../../../services/tickets/ticketsSlice";
import { useDebounceFn } from "../../../../hooks";
import { useEffect } from "react";

export const Catalog = () => {
  const { isLoading, tickets } = useAppSelector((state) => state.tickets);
  const { filters } = useAppSelector((state) => state.filters);

  const dispatch = useAppDispatch();
  const counts = ["5", "10", "20"];
  const options = [
    { id: 1, value: "date", title: "времени" },
    { id: 2, value: "price", title: "стоимости" },
    { id: 3, value: "duration", title: "длительности" },
  ];

  const handleOnUpdateTickets = async () => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.append(key, String(value));
      }
    });

    fetchHelper({ method: "GET", url: `/routes?${params.toString()}` }).then(
      (data) => {
        dispatch(setTikets(data));
      }
    );
  };

  const debounceUpdateTickets = useDebounceFn(handleOnUpdateTickets, 300);

  useEffect(() => {
    debounceUpdateTickets();
  }, [filters]);

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
                    <select
                      className={style.filter__select}
                      onChange={(event) => {
                        dispatch(
                          onChangeFilter({
                            key: "sort",
                            value: event.target.value,
                          })
                        );
                      }}
                    >
                      {options.map((option) => {
                        return (
                          <option
                            key={option.id}
                            className={style.select__option}
                            value={option.value}
                          >
                            {option.title}
                          </option>
                        );
                      })}
                    </select>
                  }
                </span>
              </div>
              <div className={style.filter__count}>
                <span className={style.header__text}>показывать по:</span>
                {counts.map((count) => {
                  return (
                    <span
                      key={count}
                      className={classNames(style.filter__count_choose, {
                        [style.filter__count_active]: filters.limit === count,
                      })}
                      onClick={() => {
                        dispatch(
                          onChangeFilter({ key: "limit", value: count })
                        );
                      }}
                    >
                      {count}
                    </span>
                  );
                })}
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
