import { DatePicker, Slider, type SliderSingleProps } from "antd";
import style from "./Filter.module.css";
import dayjs from "dayjs";
import { useEffect } from "react";
import { ServiceCheckbox } from "../ServiceCheckbox/ServiceCheckbox";
import { Schedule, Ticket } from "../";
import { fetchHelper } from "../../helper/fetchHelper";
import { setLastTickets } from "../../services/tickets/ticketsSlice";
import { useAppDispatch, useAppSelector } from "../../services/store";
import {
  onChangeFilter,
  type TypeFilters,
} from "../../services/filters/filtersSlice";

export const Filter = () => {
  const lastTickets = useAppSelector((state) => state.tickets.lastTickets);
  const { filters } = useAppSelector((state) => state.filters);
  const dispatch = useAppDispatch();

  const services = [
    { key: 1, service: "have_second_class", title: "Купе" },
    { key: 2, service: "have_third_class", title: "Плацкарт" },
    { key: 3, service: "have_fourth_class", title: "Сидячий" },
    { key: 4, service: "have_first_class", title: "Люкс" },
    { key: 5, service: "have_wifi", title: "Wi-Fi" },
    { key: 6, service: "is_express", title: "Экспресс" },
  ] as const;

  const marks: SliderSingleProps["marks"] = {
    0: {
      style: {
        color: "#e5e5e5",
        fontSize: 16,
        fontWeight: 400,
        paddingLeft: "10px",
      },
      label: 0,
    },
    4500: {
      style: { color: "#e5e5e5", fontSize: 16, fontWeight: 400 },
      label: 4500,
    },
    7000: {
      style: {
        color: "#e5e5e5",
        fontSize: 16,
        fontWeight: 400,
        paddingRight: "20px",
      },
      label: 7000,
    },
  };

  const handleChange = (service: keyof TypeFilters, checked: boolean) => {
    dispatch(onChangeFilter({ key: service, value: checked }));
  };

  useEffect(() => {
    fetchHelper({ method: "GET", url: "/routes/last" }).then((data) => {
      dispatch(setLastTickets(data));
    });
  }, [dispatch]);

  return (
    <aside className={style.aside__filter}>
      <div className={style.filter}>
        <div className={style.filter__date}>
          <div className={style.date__trip}>
            <h3 className={style.filter__title}>Дата поездки</h3>
            <DatePicker
              placeholder="ДД/ММ/ГГ"
              format={"DD/MM/YY"}
              value={
                filters.date_start
                  ? dayjs(filters.date_start, "DD/MM/YY", true)
                  : null
              }
              onChange={(dateString) => {
                dispatch(
                  onChangeFilter({
                    key: "date_start",
                    value: dateString.toString(),
                  })
                );
              }}
              minDate={dayjs()}
              style={{ width: "100%", height: 43 }}
            />
          </div>
          <div className={style.date__trip}>
            <h3 className={style.filter__title}>Дата возвращения</h3>
            <DatePicker
              placeholder="ДД/ММ/ГГ"
              format={"DD/MM/YY"}
              value={
                filters.date_end
                  ? dayjs(filters.date_end, "DD/MM/YY", true)
                  : null
              }
              style={{ width: "100%", height: 43 }}
              onChange={(dateString) => {
                dispatch(
                  onChangeFilter({
                    key: "date_end",
                    value: dateString.toString(),
                  })
                );
              }}
              disabledDate={(current) => {
                return filters.date_start &&
                  current.isBefore(filters.date_start, "day")
                  ? true
                  : false;
              }}
            />
          </div>
        </div>
        <div className={style.filter__services}>
          {services.map((service) => {
            return (
              <ServiceCheckbox
                key={service.key}
                svg={service.service}
                title={service.title}
                onChange={(checked) => handleChange(service.service, checked)}
              />
            );
          })}
        </div>
        <div className={style.filter__range_price}>
          <h3 className={style.filter__title}>Стоимость</h3>
          <div className={style.filter__slider}>
            <div className={style.filter__slider_text}>
              <span>от</span>
              <span>до</span>
            </div>
            <Slider
              marks={marks}
              defaultValue={[filters.price_from, filters.price_to]}
              step={100}
              min={0}
              max={7000}
              onChange={(value) => {
                const [from, to] = value;
                dispatch(onChangeFilter({ key: "price_from", value: from }));
                dispatch(onChangeFilter({ key: "price_to", value: to }));
              }}
              range
            />
          </div>
        </div>
        <div className={style.filter__schedule}>
          <Schedule title="Туда" />
        </div>
        <div className={style.filter__schedule}>
          <Schedule title="Обратно" reversed />
        </div>
      </div>
      <div className={style.last_tickets}>
        <h3 className={style.last_tickets__title}>Последние новости</h3>
        <div className={style.tickets}>
          {lastTickets.map((ticket) => {
            return <Ticket key={ticket.departure._id} {...ticket} />;
          })}
        </div>
      </div>
    </aside>
  );
};
