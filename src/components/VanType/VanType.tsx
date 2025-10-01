import classNames from "classnames";
import { CoupeIcon, LuxeIcon, ReservedIcon, SeatIcon } from "../Icons";
import style from "./VanType.module.css";

export const VanType = ({
  activeType,
  setActiveType,
}: {
  activeType?: string;
  setActiveType: (type: string) => void;
}) => {
  const services = [
    {
      title: "Сидячий",
      type: "fourth",
      component: <SeatIcon size={{ width: "30", height: "50" }} />,
    },
    {
      title: "Плацкарт",
      type: "third",
      component: <ReservedIcon size={{ width: "50", height: "50" }} />,
    },
    {
      title: "Купе",
      type: "second",
      component: <CoupeIcon size={{ width: "50", height: "50" }} />,
    },
    {
      title: "Люкс",
      type: "first",
      component: <LuxeIcon size={{ width: "56", height: "50" }} />,
    },
  ];

  return (
    <div className={style.vantype}>
      <h3 className={style.vantype__title}>Тип вагона</h3>
      <div className={style.vantype__services}>
        {services.map((service, index) => {
          return (
            <div
              key={index}
              className={classNames(style.vantype__service, {
                [style.vantype__service_active]: activeType === service.type,
              })}
              data-type={service.type}
              onClick={() => setActiveType(service.type)}
            >
              <div className={style.vantype__service_svg}>
                {service.component}
              </div>
              <span>{service.title}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
