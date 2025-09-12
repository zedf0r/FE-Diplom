import classNames from "classnames";
import type { TypeSeat } from "../../types";
import style from "./VanInfo.module.css";
import { ConditionerIcon, CupIcon, TowelIcon, WiFiIcon } from "../Icons";
import { useState } from "react";

export const VanInfo = ({ seat }: { seat: TypeSeat }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleOnMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleOnMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div className={style.van__seats_info}>
      <VanInfoPlaces seat={seat} />
      <VanInfoPrices seat={seat} />
      <VanInfoServices
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        showTooltip={showTooltip}
      />
    </div>
  );
};

const VanInfoPlaces = ({ seat }: { seat: TypeSeat }) => {
  const availablePlace = seat.seats.filter((item) => item.available).length;
  const topPriceLength = seat.seats.filter(
    (item) => item.available && item.index % 2 === 1
  ).length;
  const bottomPriceLength = seat.seats.filter(
    (item) => item.available && item.index % 2 === 0
  ).length;
  return (
    <div className={style.van__info}>
      <p className={style.van__info__header_text}>
        Места
        <span className={style.van__info__header_text_black}>
          {availablePlace}
        </span>
      </p>
      {seat.coach.class_type === "third" ||
      seat.coach.class_type === "second" ? (
        <>
          <p className={style.van__info_text}>
            Верхние
            <span className={style.van__info_text_bold}>{topPriceLength}</span>
          </p>
          <p className={style.van__info_text}>
            Нижние
            <span className={style.van__info_text_bold}>
              {bottomPriceLength}
            </span>
          </p>
        </>
      ) : null}
    </div>
  );
};

const VanInfoPrices = ({ seat }: { seat: TypeSeat }) => {
  return (
    <div className={style.van__info}>
      <p className={style.van__info__header_text}>Стоимость</p>
      <VanInfoPricesCompare seat={seat} />
    </div>
  );
};

const VanInfoServices = ({
  showTooltip,
  onMouseEnter,
  onMouseLeave,
}: {
  showTooltip: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) => {
  const serviceArray = [
    {
      component: <ConditionerIcon size={{ width: "21", height: "21" }} />,
      tip: "кондиционер",
    },
    {
      component: <WiFiIcon size={{ width: "20", height: "16" }} />,
      tip: "WI-FI",
    },
    {
      component: <TowelIcon size={{ width: "22", height: "16" }} />,
      tip: "белье",
    },
    {
      component: <CupIcon size={{ width: "20", height: "18" }} />,
      tip: "питание",
    },
  ];
  return (
    <div className={classNames(style.van__info, style.van__info_service)}>
      <div className={style.van__info__inner}>
        <div className={style.van__info__header__box}>
          <p className={style.van__info__header_text}>Обслуживание</p>
          <p
            className={classNames(
              style.van__info__header_text,
              style.van__info__header_text_gray
            )}
          >
            фпк
          </p>
        </div>
        <div className={style.van__info__container}>
          {serviceArray.map((service, index) => {
            return (
              <div
                key={index}
                className={style.van__info__service__box}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
              >
                <div className={style.van__info__service_svg}>
                  {service.component}
                </div>
                <p
                  className={classNames(style.van__info__service_tip, {
                    [style.van__info__service_tip_active]: showTooltip,
                  })}
                >
                  {service.tip}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className={style.van__info__count_places}>
        <span>13 человек выбирают места в этом поезде</span>
      </div>
    </div>
  );
};

const VanInfoPricesCompare = ({ seat }: { seat: TypeSeat }) => {
  if (seat.coach.class_type === "third" || seat.coach.class_type === "second") {
    return (
      <>
        <p className={style.van__info_text}>
          <span className={style.van__info_text_bold}>
            {seat.coach.top_price}
          </span>
          <span className={style.van__info_text_gray}>₽</span>
        </p>
        <p className={style.van__info_text}>
          <span className={style.van__info_text_bold}>
            {seat.coach.bottom_price}
          </span>
          <span className={style.van__info_text_gray}>₽</span>
        </p>
      </>
    );
  }

  return (
    <>
      <p className={style.van__info_text}>
        <span className={style.van__info_text_bold}>
          {seat.coach.bottom_price}
        </span>
        <span className={style.van__info_text_gray}>₽</span>
      </p>
    </>
  );
};
