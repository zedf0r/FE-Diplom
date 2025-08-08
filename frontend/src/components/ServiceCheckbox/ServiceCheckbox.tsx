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

const iconMap = {
  coupe: CoupeIcon,
  reserved: ReservedIcon,
  seat: SeatIcon,
  luxe: LuxeIcon,
  wifi: WiFiIcon,
  express: ExpressIcon,
};

type IconKey = keyof typeof iconMap;

export const ServiceCheckbox = ({
  svg,
  title,
}: {
  svg: IconKey;
  title: string;
}) => {
  const IconComponent = iconMap[svg];
  return (
    <div className={style.service}>
      <IconComponent />

      <span className={style.service__title}>{title}</span>
      <Switch />
    </div>
  );
};
