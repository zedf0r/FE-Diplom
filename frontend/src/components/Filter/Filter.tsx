import { DatePicker, Slider, type SliderSingleProps } from "antd";
import style from "./Filter.module.css";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
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
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const lastTickets = useAppSelector((state) => state.tickets.lastTickets);
  const dispatch = useAppDispatch();

  const services = [
    { key: 1, service: "second", title: "Купе" },
    { key: 2, service: "third", title: "Плацкарт" },
    { key: 3, service: "fourth", title: "Сидячий" },
    { key: 4, service: "first", title: "Люкс" },
    { key: 5, service: "wifi", title: "Wi-Fi" },
    { key: 6, service: "express", title: "Экспресс" },
  ] as const;

  const marks: SliderSingleProps["marks"] = {
    1920: {
      style: {
        color: "#e5e5e5",
        fontSize: 16,
        fontWeight: 400,
        paddingLeft: "10px",
      },
      label: 1920,
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
              value={startDate}
              onChange={(date) => setStartDate(date)}
              minDate={dayjs()}
              style={{ width: "100%", height: 43 }}
            />
          </div>
          <div className={style.date__trip}>
            <h3 className={style.filter__title}>Дата возвращения</h3>
            <DatePicker
              placeholder="ДД/ММ/ГГ"
              format={"DD/MM/YY"}
              value={endDate}
              style={{ width: "100%", height: 43 }}
              onChange={(date) => {
                setEndDate(date);
              }}
              disabledDate={(current) => {
                return startDate && current.isBefore(startDate, "day")
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
              defaultValue={[0, 4000]}
              step={100}
              min={1920}
              max={7000}
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
