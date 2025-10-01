import classNames from "classnames";
import type { TypeSeat } from "../../types";
import style from "./VanInfo.module.css";
import { ConditionerIcon, CupIcon, TowelIcon, WiFiIcon } from "../Icons";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../services/store";
import {
  toggleService,
  type TypeSelectedService,
} from "../../services/seats/seatsSlice";

export const VanInfo = ({
  seat,
  route,
}: {
  seat: TypeSeat;
  route: "departure" | "arrival";
}) => {
  const [showTooltip, setShowTooltip] = useState({ tip: "", show: false });
  const selectedService = useAppSelector(
    (state) => state.seats.selectedService
  );
  const dispatch = useAppDispatch();

  const handleOnMouseEnter = (tip: string) => {
    setShowTooltip({ tip: tip, show: true });
  };

  const handleOnMouseLeave = (tip: string) => {
    setShowTooltip({ tip: tip, show: false });
  };

  const handleOnClick = (tip: string, _id: string, price?: number) => {
    dispatch(
      toggleService({
        selectedService: {
          _id: _id,
          service: tip,
          price: price,
        },
        route: route,
      })
    );
  };

  return (
    <div className={style.van__seats_info}>
      <VanInfoPlaces seat={seat} />
      <VanInfoPrices seat={seat} />
      <VanInfoServices
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        onClick={handleOnClick}
        showTooltip={showTooltip}
        selectedService={selectedService[`${route}Service`]}
        seat={seat}
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
  seat,
  selectedService,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: {
  showTooltip: { tip: string; show: boolean };
  seat: TypeSeat;
  selectedService: TypeSelectedService[];
  onClick: (tip: string, _id: string, price?: number) => void;
  onMouseEnter: (tip: string) => void;
  onMouseLeave: (tip: string) => void;
}) => {
  const serviceArray = [
    {
      component: <ConditionerIcon size={{ width: "20", height: "20" }} />,
      tip: "кондиционер",
      have: seat.coach.have_air_conditioning,
    },
    {
      component: <WiFiIcon size={{ width: "20", height: "16" }} />,
      tip: "WI-FI",
      have: seat.coach.have_wifi,
      price: seat.coach.wifi_price,
    },
    {
      component: <TowelIcon size={{ width: "22", height: "16" }} />,
      tip: "белье",
      have: true,
      is_included: seat.coach.is_linens_included,
      price: seat.coach.linens_price,
    },
    {
      component: <CupIcon size={{ width: "20", height: "18" }} />,
      tip: "питание",
      have: true,
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
            const findItem = selectedService.some(
              (item) =>
                item._id === seat.coach._id && item.service === service.tip
            );
            return (
              service.have && (
                <div
                  key={index}
                  className={classNames(
                    style.van__info__service__box,
                    { [style.van__info__service__box_selected]: findItem },
                    { [style.service__noactive]: service.is_included }
                  )}
                  onClick={() =>
                    onClick(service.tip, seat.coach._id, service.price)
                  }
                  onMouseEnter={() => onMouseEnter(service.tip)}
                  onMouseLeave={() => onMouseLeave(service.tip)}
                >
                  <div className={style.van__info__service_svg}>
                    {service.component}
                  </div>
                  <p
                    className={classNames(style.van__info__service_tip, {
                      [style.van__info__service_tip_active]:
                        showTooltip.tip === service.tip && showTooltip.show,
                    })}
                  >
                    {service.tip}
                  </p>
                </div>
              )
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
            {seat.coach.top_price.toLocaleString()}
          </span>
          <span className={style.van__info_text_gray}>₽</span>
        </p>
        <p className={style.van__info_text}>
          <span className={style.van__info_text_bold}>
            {seat.coach.bottom_price.toLocaleString()}
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
          {seat.coach.class_type === "first"
            ? seat.coach.price.toLocaleString()
            : seat.coach.bottom_price.toLocaleString()}
        </span>
        <span className={style.van__info_text_gray}>₽</span>
      </p>
    </>
  );
};
