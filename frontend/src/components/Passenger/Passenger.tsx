import { useState } from "react";
import style from "./Passenger.module.css";
import { useAppDispatch } from "../../services/store";
import {
  updatePassengersInfo,
  type TypePersonal,
} from "../../services/passengers/passengersSlice";
import { Input, PassengerTitle, SertificateSelect } from "..";
import classNames from "classnames";
import { SircleErrorIcon, SircleSuccessIcon } from "../Icons";

export const Passenger = ({
  title,
  passenger,
}: {
  title: string;
  passenger: TypePersonal;
}) => {
  const [isActive, setIsActive] = useState(false);
  const [checkIsValid, setCheckIsValid] = useState<boolean | null>(null);
  const [firstError, setFirstError] = useState<{
    field: string;
    message: string | undefined;
  } | null>(null);

  const dispatch = useAppDispatch();

  const handleOnActive = () => {
    setIsActive((prevState) => !prevState);
  };

  const validateFunction = (passenger: TypePersonal) => {
    const fioRegexp = /^[А-Яа-я]+/;
    const serialRegexp = /^[1-9]{4}/;
    const numberRegexp = /^[0-9]{6}/;
    const numberBirthCertificateRegexp = /^[IV]{1,4}\s[A-Z-А-Я]{2}\s\d{6}/;

    const validPassenger = {
      lastName: !fioRegexp.test(passenger.lastName) ? "Поле пустое" : undefined,

      firstName: !fioRegexp.test(passenger.firstName)
        ? "Поле пустое"
        : undefined,

      patronymic: !fioRegexp.test(passenger.patronymic)
        ? "Поле пустое"
        : undefined,

      ...(passenger.document === "passport"
        ? {
            serial: !serialRegexp.test(passenger.serial)
              ? "Поле пустое или неправильно введена серия паспорта. Введите в формате 0000 "
              : undefined,
            number: !numberRegexp.test(passenger.number)
              ? "Поле пустое или неправильно введен номер паспорта. Введите в формате 000000 "
              : undefined,
          }
        : {
            numberBirthCertificate: !numberBirthCertificateRegexp.test(
              passenger.numberBirthCertificate
            )
              ? "Номер свидетельства о рожденни указан некорректно Пример: VIII ЫП 123456"
              : undefined,
          }),
    };

    return validPassenger;
  };

  const handleOnClick = () => {
    const errors = validateFunction(passenger);
    const isValid = Object.values(errors).every((item) => item === undefined);
    setCheckIsValid(isValid);

    const errorEntry = Object.entries(errors).find(
      ([field, message]) => field && message !== undefined
    );

    if (errorEntry) {
      setFirstError({ field: errorEntry[0], message: errorEntry[1] });
    } else {
      setFirstError(null);
    }

    if (isValid) {
      dispatch(
        updatePassengersInfo({
          id: passenger.id,
          k: "statusField",
          value: isValid,
        })
      );
    }
  };

  const handleOnChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, type, value } = event.target;

    let newValue = value;

    if (name === "serial" || name === "number") {
      newValue = value.replace(/\D/g, "");
    }

    if (name === "lastName" || name === "firstName" || name === "patronymic") {
      newValue = value.replace(/[^А-Яа-я]/g, "");
    }

    if (name === "numberBirthCertificate") {
      newValue = value.toUpperCase().replace(/[^IVXLCDMА-ЯA-Z0-9\s-]/g, "");
    }

    dispatch(
      updatePassengersInfo({
        id: passenger.id,
        k: name as keyof TypePersonal,
        value: type === "checkbox" ? event.target.checked : newValue,
      })
    );
  };

  const inputsParams = [
    {
      labelText: "Фамилия",
      inputName: "lastName",
      value: passenger.lastName,
    },
    { labelText: "Имя", inputName: "firstName", value: passenger.firstName },
    {
      labelText: "Отчество",
      inputName: "patronymic",
      value: passenger.patronymic,
    },
  ];

  const ageOptions = [
    { value: "Взрослый", title: "Взрослый" },
    { value: "Детский", title: "Детский" },
  ];

  const sertificateOptions = [
    { value: "passport", title: "Паспорт РФ" },
    { value: "birthCertificate", title: "Свидетельство о рождении" },
  ];

  const renderInputDocument = (document: "passport" | "birthCertificate") => {
    if (document === "passport") {
      return (
        <>
          <Input
            type="text"
            maxWidth="205px"
            labelText="Серия"
            inputName="serial"
            value={passenger.serial}
            maxLength={4}
            error={firstError?.field === "serial"}
            onChange={(event) => handleOnChange(event)}
          />
          <Input
            type="text"
            maxWidth="205px"
            labelText="Номер"
            inputName="number"
            value={passenger.number}
            maxLength={6}
            error={firstError?.field === "number"}
            onChange={(event) => handleOnChange(event)}
          />
        </>
      );
    } else {
      return (
        <Input
          type="text"
          maxWidth="205px"
          labelText="Номер"
          inputName="numberBirthCertificate"
          value={passenger.numberBirthCertificate}
          maxLength={14}
          error={firstError?.field === "numberBirthCertificate"}
          onChange={(event) => handleOnChange(event)}
        />
      );
    }
  };

  return (
    <div className={style.passenger}>
      <PassengerTitle
        title={title}
        isActive={isActive}
        handleOnClick={handleOnActive}
      />
      <div
        className={classNames(style.passenger__info, {
          [style.passenger__info_open]: isActive,
        })}
      >
        <div className={style.info__person}>
          <SertificateSelect
            maxWidth="280px"
            options={ageOptions}
            name="age"
            onChange={(event) => handleOnChange(event)}
          />
          <div className={style.info__inputs}>
            {inputsParams.map((input, index) => {
              return (
                <Input
                  key={index}
                  type="text"
                  maxWidth="280px"
                  labelText={input.labelText}
                  inputName={input.inputName}
                  value={input.value}
                  error={firstError?.field === input.inputName}
                  onChange={(event) => handleOnChange(event)}
                />
              );
            })}
          </div>
          <div className={style.info__inputs}>
            <div className={classNames(style.info__check)}>
              <label htmlFor="sex" className={style.label}>
                Пол
              </label>
              <div className={style.toggle_switch}>
                <div
                  className={classNames(style.toggle_switch_item, style.one)}
                >
                  <input
                    type="radio"
                    name="sex"
                    id="M"
                    value={"Мужской"}
                    onChange={(event) => handleOnChange(event)}
                    required
                  />
                  <label htmlFor="M" className={style.switch}>
                    М
                  </label>
                </div>
                <div
                  className={classNames(style.toggle_switch_item, style.two)}
                >
                  <input
                    type="radio"
                    name="sex"
                    id="F"
                    value={"Женский"}
                    onChange={(event) => handleOnChange(event)}
                    required
                  />
                  <label htmlFor="F" className={style.switch}>
                    Ж
                  </label>
                </div>
              </div>
            </div>
            <div className={style.info__check}>
              <Input
                maxWidth="240px"
                labelText="Дата рождения"
                type="date"
                inputName="birthday"
                value={passenger.birthday}
                onChange={(event) => handleOnChange(event)}
              />
            </div>
          </div>
          <div className={style.info__checkbox}>
            <input
              type="checkbox"
              name="limitmobility"
              id="limitmobility"
              onChange={(event) => handleOnChange(event)}
              className={style.checkbox}
            />
            <label htmlFor="limitmobility">ограниченная подвижность</label>
          </div>
        </div>
        <div className={style.info__sertificate}>
          <div
            className={style.sertificate}
            style={{
              maxWidth:
                passenger.document === "birthCertificate" ? "444px" : "205px",
            }}
          >
            <span>Тип документа</span>
            <SertificateSelect
              options={sertificateOptions}
              name="document"
              onChange={(event) => handleOnChange(event)}
            />
          </div>
          {renderInputDocument(passenger.document)}
        </div>
        {checkIsValid === true ? (
          <PassengerStatus
            checkIsValid={checkIsValid}
            firstError={firstError?.message}
            handleOnClick={handleOnClick}
          />
        ) : checkIsValid === false ? (
          <PassengerStatus
            checkIsValid={checkIsValid}
            firstError={firstError?.message}
            handleOnClick={handleOnClick}
          />
        ) : (
          <div className={style.submit__passenger}>
            <button
              className={style.button}
              type="button"
              onClick={handleOnClick}
            >
              Следующий пассажир
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const PassengerStatus = ({
  checkIsValid,
  firstError,
  handleOnClick,
}: {
  checkIsValid: boolean;
  firstError: string | null | undefined;
  handleOnClick: () => void;
}) => {
  return (
    <div
      className={classNames(style.submit__passenger, {
        [style.submit__passenger_success]: checkIsValid,
        [style.submit__passenger_error]: !checkIsValid,
      })}
    >
      <div className={style.text__status}>
        {checkIsValid ? <SircleSuccessIcon /> : <SircleErrorIcon />}
        <span>{checkIsValid ? "Готово" : firstError}</span>
      </div>
      <button className={style.button} type="button" onClick={handleOnClick}>
        Следующий пассажир
      </button>
    </div>
  );
};
