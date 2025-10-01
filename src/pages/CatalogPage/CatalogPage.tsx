import classNames from "classnames";
import { Item, Filters, Loading } from "@/components";
import { useAppDispatch, useAppSelector } from "@/services/store";
import type { TypeTicket } from "@/types";
import style from "./CatalogPage.module.css";
import { Pagination } from "antd";
import { onChangeFilter } from "@/services/filters/filtersSlice";
import { fetchHelper } from "@/helper/fetchHelper";
import { setTikets } from "@/services/tickets/ticketsSlice";
import { useDebounceFn, useStepContext } from "@/hooks";
import { useEffect, useRef } from "react";

const CatalogPage = () => {
  const { isLoading, tickets } = useAppSelector((state) => state.tickets);
  const { filters } = useAppSelector((state) => state.filters);
  const listRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();
  const counts = ["5", "10", "20"];
  const options = [
    { value: "date", title: "времени" },
    { value: "price", title: "стоимости" },
    { value: "duration", title: "длительности" },
  ];

  const { handleSetValue } = useStepContext();

  useEffect(() => {
    handleSetValue(1);
  }, []);

  const handleOnUpdateTickets = async () => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        if (key !== "from_city_name" && key !== "to_city_name") {
          params.append(key, String(value));
        }
      }
    });

    fetchHelper({ method: "GET", url: `/routes?${params.toString()}` }).then(
      (data) => {
        dispatch(setTikets(data));
      }
    );
  };

  const debounceUpdateTickets = useDebounceFn(handleOnUpdateTickets, 300);

  const handleScroolToElement = () => {
    listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleOnChange = (page: number, pageSize: number) => {
    dispatch(
      onChangeFilter({ key: "offset", value: page * pageSize - pageSize })
    );

    handleScroolToElement();
  };

  useEffect(() => {
    debounceUpdateTickets();
  }, [filters]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <section className={style.catalog} ref={listRef}>
          <div className={style.catalog__container}>
            <Filters />
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
                          {options.map((option, index) => {
                            return (
                              <option
                                key={index}
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
                            [style.filter__count_active]:
                              filters.limit === count,
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
              {tickets.items?.map((ticket: TypeTicket) => {
                return <Item key={ticket.departure._id} ticket={ticket} />;
              })}
              {tickets.total_count > Number(filters.limit) ? (
                <Pagination
                  align="end"
                  defaultCurrent={1}
                  total={tickets.total_count}
                  pageSize={Number(filters.limit)}
                  showSizeChanger={false}
                  onChange={handleOnChange}
                />
              ) : null}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default CatalogPage;
