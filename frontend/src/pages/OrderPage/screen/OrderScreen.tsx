import { Button, Item } from "@/components";
import style from "./OrderScreen.module.css";
import { useNavigate } from "react-router";
import { useAppSelector } from "@/services/store";
import { PassengerIcon } from "@/components/Icons";
import { TypePersonal } from "@/services/passengers/passengersSlice";
import dayjs from "dayjs";
import { TypeSelectedPlace } from "@/services/seats/seatsSlice";
import { fetchHelper } from "@/helper/fetchHelper";

export const OrderScreen = () => {
  const { ticket, totalPrice } = useAppSelector((state) => state.tickets);
  const { passengers } = useAppSelector((state) => state.passengers);
  const { selectedPlace } = useAppSelector((state) => state.seats);
  const { payment } = useAppSelector((state) => state.payments);
  const navigate = useNavigate();

  const mapSeats = (
    passengers: TypePersonal[],
    selectedPlace: TypeSelectedPlace[]
  ) => {
    return passengers.map((p, index) => {
      const place = selectedPlace[index] ?? "";

      return {
        coach_id: place._id || "",
        seat_number: place.index ?? 0,
        is_child: p.age === "Детский",
        include_children_seat: p.age === "Детский" && !place,
        personal_info: {
          is_adult: p.age === "Взрослый",
          first_name: p.firstName,
          last_name: p.lastName,
          patronymic: p.patronymic,
          gender: p.sex === "Мужской",
          birthday: p.birthday ?? "",
          document_type: p.document,
          document_data:
            p.document === "passport"
              ? `${p.serial}${p.number}`
              : p.numberBirthCertificate,
        },
      };
    });
  };

  const orderData = {
    user: payment,
    depature: {
      route_direction_id: ticket?.departure._id || "",
      seats: mapSeats(passengers, selectedPlace.departurePlace),
    },
    arrival: {
      route_direction_id: ticket?.arrival?._id || "",
      seats: mapSeats(passengers, selectedPlace.arrivalPlace),
    },
  };

  const handleOnSubmitClick = async () => {
    const data = await fetchHelper({
      method: "POST",
      url: "/order",
      body: orderData,
    }).then((response) => response.status);

    if (data) {
      navigate("/success");
    } else {
      alert("Ошибка отправки. Повторите попытку позже");
    }
  };

  const adultTotalPrice =
    totalPrice.arrivalPrice.adultPrice + totalPrice.departurePrice.adultPrice;
  const childTotalPrice =
    totalPrice.arrivalPrice.childPrice + totalPrice.departurePrice.childPrice;
  const serviceTotalPrice =
    totalPrice.arrivalPrice.servicePrice +
    totalPrice.departurePrice.servicePrice;

  return (
    <div className={style.order}>
      <div className={style.order__info}>
        <OrderBox title="Поезд">
          <Item ticket={ticket!} buttonText="Изменить" />
        </OrderBox>
        <OrderBox title="Пассажиры">
          <div className={style.passengers}>
            <div className={style.passengers__info}>
              {passengers.map((passenger, index) => (
                <Passenger key={index} passenger={passenger} />
              ))}
            </div>
            <div className={style.passengers__total}>
              <p className={style.total__text}>
                Всего{" "}
                <span className={style.total__price}>
                  {(
                    adultTotalPrice +
                    childTotalPrice +
                    serviceTotalPrice
                  ).toLocaleString()}{" "}
                  <span className={style.total__valute}>₽</span>
                </span>
              </p>
              <Button type="button" className="button__transparrent">
                Изменить
              </Button>
            </div>
          </div>
        </OrderBox>
        <OrderBox title="Способ оплаты">
          <div className={style.type__payment}>
            <p>{payment.paymentType === "online" ? "Онлайн" : "Наличными"}</p>
            <div className={style.payment__button}>
              <Button type="button" className="button__transparrent">
                Изменить
              </Button>
            </div>
          </div>
        </OrderBox>
      </div>
      <div className={style.order__button}>
        <Button
          onClick={handleOnSubmitClick}
          type="button"
          className="button__fill_white"
        >
          Подтвердить
        </Button>
      </div>
    </div>
  );
};

const OrderBox = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className={style.info__box}>
      <h3 className={style.info__title}>{title}</h3>
      {children}
    </div>
  );
};

const Passenger = ({ passenger }: { passenger: TypePersonal }) => {
  return (
    <div className={style.passenger}>
      <div className={style.passenger__age}>
        <div className={style.circle}>
          <PassengerIcon />
        </div>
        <p>{passenger.age}</p>
      </div>
      <div className={style.passenger__info}>
        <p className={style.passenger__fio}>
          {passenger.lastName} {passenger.firstName} {passenger.patronymic}
        </p>
        <span>Пол {passenger.sex}</span>
        <span>
          Дата рождения{" "}
          {passenger.birthday
            ? dayjs(passenger.birthday).format("DD.MM.YYYY")
            : "не указана"}
        </span>
        <span>
          {passenger.document === "passport"
            ? `Паспорт РФ ${passenger.serial} ${passenger.number}`
            : `Свидетельство о рождении ${passenger.numberBirthCertificate}`}
        </span>
      </div>
    </div>
  );
};
