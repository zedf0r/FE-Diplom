import style from "./Form.module.css";
import { Button, Selection } from "../";
import { ArrowReverseIcon } from "../Icons";
import { DatePicker } from "antd";
import { useState } from "react";
import dayjs from "dayjs";
import { Link } from "react-router";

export const Form = () => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const handleClick = () => {};

  return (
    <form className={style.form}>
      <div className={style.form__chose}>
        <div className={style.form__info}>
          <span className={style.form__title}>Направление</span>
          <div className={style.direction__select}>
            <Selection placeholder="От куда" />
            <button type="button" className={style.button}>
              <ArrowReverseIcon />
            </button>
            <Selection placeholder="Куда" />
          </div>
        </div>
        <div className={style.form__info}>
          <span className={style.form__title}>Дата</span>
          <div className={style.date__picker}>
            <DatePicker
              placeholder="ДД/ММ/ГГ"
              format={"DD/MM/YY"}
              value={startDate}
              onChange={(date) => setStartDate(date)}
              minDate={dayjs()}
              style={{ width: "calc(50% - 18px)", height: 60 }}
            />
            <DatePicker
              placeholder="ДД/ММ/ГГ"
              format={"DD/MM/YY"}
              value={endDate}
              style={{ width: "calc(50% - 18px)", height: 60 }}
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
      </div>
      <div className={style.form__button}>
        <Link to="/catalog">
          <Button type="button" onClick={handleClick} className="button_fill">
            Найти билеты
          </Button>
        </Link>
      </div>
    </form>
  );
};
