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
            ? dayjs(filters.date_start, "DD/MM/YY", true)
            : null
        }
        onChange={(_, dateString) => {
          onChange("date_start", dateString.toString());
        }}
        minDate={dayjs()}
        style={{ width: width, height: height }}
      />
      <DatePicker
        placeholder="ДД/ММ/ГГ"
        format={"DD/MM/YY"}
        value={
          filters.date_end !== ""
            ? dayjs(filters.date_end, "DD/MM/YY", true)
            : null
        }
        style={{ width: width, height: height }}
        onChange={(_, dateString) => {
          onChange("date_end", dateString.toString());
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
