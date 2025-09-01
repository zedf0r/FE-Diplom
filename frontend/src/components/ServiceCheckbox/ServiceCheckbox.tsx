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
  have_second_class: CoupeIcon,
  have_third_class: ReservedIcon,
  have_fourth_class: SeatIcon,
  have_first_class: LuxeIcon,
  have_wifi: WiFiIcon,
  is_express: ExpressIcon,
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
