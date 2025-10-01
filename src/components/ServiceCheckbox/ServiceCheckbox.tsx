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
  have_second_class: {
    component: CoupeIcon,
    size: { width: "17", height: "17" },
  },
  have_third_class: {
    component: ReservedIcon,
    size: { width: "17", height: "17" },
  },
  have_fourth_class: {
    component: SeatIcon,
    size: { width: "14", height: "23" },
  },
  have_first_class: {
    component: LuxeIcon,
    size: { width: "22", height: "20" },
  },
  have_wifi: { component: WiFiIcon, size: { width: "24", height: "19" } },
  is_express: { component: ExpressIcon, size: { width: "20", height: "20" } },
};

type IconKey = keyof typeof iconMap;

export const ServiceCheckbox = ({
  svg,
  title,
  checked,
  onChange,
}: {
  svg: IconKey;
  title: string;
  checked: boolean;
  onChange: SwitchChangeEventHandler;
}) => {
  const { component: IconComponent, size } = iconMap[svg];
  return (
    <div className={style.service}>
      <div className={style.svg}>
        <IconComponent size={{ width: size.width, height: size.height }} />
      </div>

      <span className={style.service__title}>{title}</span>
      <Switch onChange={onChange} checked={checked} />
    </div>
  );
};
