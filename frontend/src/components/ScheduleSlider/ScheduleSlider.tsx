import { Slider, type SliderSingleProps } from "antd";

export const ScheduleSlider = () => {
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
    720: {
      style: { color: "#e5e5e5", fontSize: 16, fontWeight: 400 },
      label: "12:00",
    },
    1440: {
      style: {
        color: "#e5e5e5",
        fontSize: 16,
        fontWeight: 400,
        paddingRight: "20px",
      },
      label: "24:00",
    },
  };

  const formatTime = (value?: number) => {
    if (!value) return "00:00";

    const hours = Math.floor(value / 60);
    const minutes = value % 60;

    return `${hours}:${minutes.toString().padStart(2, "0")}`;
  };

  return (
    <Slider
      marks={marks}
      step={15}
      min={0}
      max={1440}
      defaultValue={[1, 1440]}
      tooltip={{ formatter: formatTime }}
      range
    />
  );
};
