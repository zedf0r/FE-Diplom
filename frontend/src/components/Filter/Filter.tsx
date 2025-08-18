import { DatePicker, Slider, type SliderSingleProps } from "antd";
import style from "./Filter.module.css";
import dayjs from "dayjs";
import { useState } from "react";
import { ServiceCheckbox } from "../ServiceCheckbox/ServiceCheckbox";
import { Schedule, Ticket } from "../";

export const Filter = () => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const filters = [
    { service: "coupe", title: "Купе" },
    { service: "reserved", title: "Плацкарт" },
    { service: "seat", title: "Сидячий" },
    { service: "luxe", title: "Люкс" },
    { service: "wifi", title: "Wi-Fi" },
    { service: "express", title: "Экспресс" },
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

  const tickets = [
    {
      departureCity: "Санкт-Петербург",
      departureStation: "Курский вокзал",
      arrivalCity: "Самара",
      arrivalStation: "Московский вокзал",
      price: "2 500",
    },
    {
      departureCity: "Москва",
      departureStation: "Курский вокзал",
      arrivalCity: "Казань",
      arrivalStation: "Московский вокзал",
      price: "3 500",
    },
    {
      departureCity: "Казань",
      departureStation: "Курский вокзал",
      arrivalCity: "Самара",
      arrivalStation: "Нижний новгород",
      price: "3 800",
    },
  ];

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
          {filters.map((filter) => {
            return (
              <ServiceCheckbox svg={filter.service} title={filter.title} />
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
          {tickets.map((ticket) => {
            return <Ticket {...ticket} />;
          })}
        </div>
      </div>
    </aside>
  );
};
