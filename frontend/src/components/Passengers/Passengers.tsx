import style from "./Passengers.module.css";
import classNames from "classnames";
import { Button, Passenger, PassengerTitle } from "..";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { v4 as uuidv4 } from "uuid";
import { setPassengers } from "../../services/passengers/passengersSlice";
import { useNavigate } from "react-router";

export const Passengers = () => {
  const { passengers } = useAppSelector((state) => state.passengers);
  const { countTicketPlace } = useAppSelector((state) => state.seats);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const maxCount = countTicketPlace.reduce(
    (acc, item) => acc + Number(item.count),
    0
  );

  const handleOnAdded = () => {
    if (maxCount === passengers.length) return null;
    dispatch(
      setPassengers({
        id: uuidv4(),
        age: "Взрослый",
        firstName: "",
        lastName: "",
        patronymic: "",
        sex: "",
        birthday: "",
        document: "passport",
        serial: "",
        number: "",
        numberBirthCertificate: "",
        limitmobility: false,
        statusField: false,
      })
    );
  };

  const checkValidPassengers =
    passengers.length === maxCount &&
    passengers.every((item) => item.statusField);

  const className = checkValidPassengers
    ? "button__fill_white"
    : "button__nonactive";

  return (
    <div className={style.wrapper}>
      <div className={style.passengers}>
        {passengers.length > 0
          ? passengers.map((passenger, index) => {
              return (
                <Passenger
                  passenger={passenger}
                  key={index}
                  title={`Пассажир ${index + 1}`}
                />
              );
            })
          : null}
        <div
          className={classNames(style.passenger, style.passenger__added)}
          onClick={handleOnAdded}
        >
          <PassengerTitle title="Добавить пассажира" />
        </div>
      </div>
      <div className={style.button__submit}>
        <Button
          onClick={() => navigate("/")}
          type="button"
          className={className}
        >
          Далее
        </Button>
      </div>
    </div>
  );
};
