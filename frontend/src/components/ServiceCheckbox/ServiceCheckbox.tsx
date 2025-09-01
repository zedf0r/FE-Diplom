import style from "./ServiceCheckbox.module.css";
import {
  CoupeIcon,
  ReservedIcon,
  SeatIcon,
  LuxeIcon,
  WiFiIcon,
  ExpressIcon,
} from "../Icons";
import { Switch } from "antd";
import type { SwitchChangeEventHandler } from "antd/es/switch";

const iconMap = {
  second: CoupeIcon,
  third: ReservedIcon,
  fourth: SeatIcon,
  first: LuxeIcon,
  wifi: WiFiIcon,
  express: ExpressIcon,
};

type IconKey = keyof typeof iconMap;

export const ServiceCheckbox = ({
  svg,
  title,
  onChange,
}: {
  svg: IconKey;
  title: string;
  onChange: SwitchChangeEventHandler;
}) => {
  const IconComponent = iconMap[svg];
  return (
    <div className={style.service}>
      <IconComponent />

      <span className={style.service__title}>{title}</span>
      <Switch onChange={onChange} />
    </div>
  );
};
