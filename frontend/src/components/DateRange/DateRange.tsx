import { DatePicker } from "antd";
import dayjs from "dayjs";
import { useAppSelector } from "../../services/store";
import { type TypeFilters } from "../../services/filters/filtersSlice";

type TypeDateRangeProps = {
  width: string;
  height: string;
  onChange: (key: keyof TypeFilters, value: string) => void;
};

export const DateRange = ({ width, height, onChange }: TypeDateRangeProps) => {
  const { filters } = useAppSelector((state) => state.filters);
  return (
    <>
      <DatePicker
        placeholder="ДД/ММ/ГГ"
        format={"DD/MM/YY"}
        value={
          filters.date_start !== ""
            ? dayjs(filters.date_start, "YYYY/MM/DD")
            : null
        }
        onChange={(date) => {
          onChange("date_start", date ? date.format("YYYY-MM-DD") : "");
        }}
        minDate={dayjs()}
        style={{ width: width, height: height }}
      />
      <DatePicker
        placeholder="ДД/ММ/ГГ"
        format={"DD/MM/YY"}
        value={
          filters.date_end !== "" ? dayjs(filters.date_end, "YYYY/MM/DD") : null
        }
        style={{ width: width, height: height }}
        onChange={(date) => {
          onChange("date_end", date ? date.format("YYYY-MM-DD") : "");
        }}
        disabledDate={(current) => {
          return filters.date_start &&
            current.isBefore(filters.date_start, "day")
            ? true
            : false;
        }}
      />
    </>
  );
};
