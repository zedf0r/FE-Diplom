import { Slider, type SliderSingleProps } from "antd";
// import type { TypeFilters } from "../../services/filters/filtersSlice";

export const ScheduleSlider = ({
  onChange,
}: {
  onChange: (value: number[]) => void;
}) => {
  const marks: SliderSingleProps["marks"] = {
    0: {
      style: {
        color: "#e5e5e5",
        fontSize: 16,
        fontWeight: 400,
        paddingLeft: "10px",
      },
      label: "0:00",
    },
    12: {
      style: { color: "#e5e5e5", fontSize: 16, fontWeight: 400 },
      label: "12:00",
    },
    24: {
      style: {
        color: "#e5e5e5",
        fontSize: 16,
        fontWeight: 400,
        paddingRight: "20px",
      },
      label: "24:00",
    },
  };

  const formatTime: NonNullable<SliderSingleProps["tooltip"]>["formatter"] = (
    value
  ) => {
    if (!value) return "00:00";
    return `${value}:00`;
  };

  return (
    <Slider
      marks={marks}
      step={1}
      min={0}
      onChange={(value) => onChange(value)}
      max={24}
      defaultValue={[0, 24]}
      tooltip={{ formatter: formatTime }}
      range
    />
  );
};
