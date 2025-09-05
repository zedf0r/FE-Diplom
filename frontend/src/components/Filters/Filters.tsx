import { DatePicker, Slider, type SliderSingleProps } from "antd";
import style from "./Filters.module.css";
import dayjs from "dayjs";
import { useEffect } from "react";
import { ServiceCheckbox } from "../ServiceCheckbox/ServiceCheckbox";
import { Schedule, Ticket } from "..";
import { fetchHelper } from "../../helper/fetchHelper";
import { setLastTickets } from "../../services/tickets/ticketsSlice";
import { useAppDispatch, useAppSelector } from "../../services/store";
import {
  onChangeFilter,
  type TypeFilters,
} from "../../services/filters/filtersSlice";

export const Filters = () => {
  const lastTickets = useAppSelector((state) => state.tickets.lastTickets);
  const { filters } = useAppSelector((state) => state.filters);
  const dispatch = useAppDispatch();

  const services = [
    { service: "have_second_class", title: "Купе" },
    { service: "have_third_class", title: "Плацкарт" },
    { service: "have_fourth_class", title: "Сидячий" },
    { service: "have_first_class", title: "Люкс" },
    { service: "have_wifi", title: "Wi-Fi" },
    { service: "is_express", title: "Экспресс" },
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
    3500: {
      style: { color: "#e5e5e5", fontSize: 16, fontWeight: 400 },
      label: 3500,
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

  const handleSliderChange = (
    keyFrom: keyof TypeFilters,
    keyTo: keyof TypeFilters,
    value: number[]
  ) => {
    const [from, to] = value;
    dispatch(onChangeFilter({ key: keyFrom, value: from }));
    dispatch(onChangeFilter({ key: keyTo, value: to }));
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
                filters.date_start_arrival
                  ? dayjs(filters.date_start_arrival, "DD/MM/YY", true)
                  : null
              }
              onChange={(_, dateString) => {
                dispatch(
                  onChangeFilter({
                    key: "date_start_arrival",
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
                filters.date_end_arrival
                  ? dayjs(filters.date_end_arrival, "DD/MM/YY", true)
                  : null
              }
              style={{ width: "100%", height: 43 }}
              onChange={(_, dateString) => {
                dispatch(
                  onChangeFilter({
                    key: "date_end_arrival",
                    value: dateString.toString(),
                  })
                );
              }}
              disabledDate={(current) => {
                return filters.date_start_arrival &&
                  current.isBefore(filters.date_start_arrival, "day")
                  ? true
                  : false;
              }}
            />
          </div>
        </div>
        <div className={style.filter__services}>
          {services.map((service, index) => {
            return (
              <ServiceCheckbox
                key={index}
                svg={service.service}
                title={service.title}
                checked={filters[service.service]}
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
                handleSliderChange("price_from", "price_to", value);
              }}
              range
            />
          </div>
        </div>
        <div className={style.filter__schedule}>
          <Schedule
            title="Туда"
            route="departure"
            onChange={handleSliderChange}
          />
        </div>
        <div className={style.filter__schedule}>
          <Schedule title="Обратно" onChange={handleSliderChange} reversed />
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
