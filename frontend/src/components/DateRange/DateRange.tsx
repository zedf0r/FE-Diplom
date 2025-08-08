import { DatePicker } from "antd";
import dayjs from "dayjs";
import { useState } from "react";

type TypeDateRangeProps = {
  width: string;
  height: string;
};

export const DateRange = ({ width, height }: TypeDateRangeProps) => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  return (
    <>
      <DatePicker
        placeholder="ДД/ММ/ГГ"
        format={"DD/MM/YY"}
        value={startDate}
        onChange={(date) => setStartDate(date)}
        minDate={dayjs()}
        style={{ width: width, height: height }}
      />
      <DatePicker
        placeholder="ДД/ММ/ГГ"
        format={"DD/MM/YY"}
        value={endDate}
        style={{ width: width, height: height }}
        onChange={(date) => {
          setEndDate(date);
        }}
        disabledDate={(current) => {
          return startDate && current.isBefore(startDate, "day") ? true : false;
        }}
      />
    </>
  );
};
