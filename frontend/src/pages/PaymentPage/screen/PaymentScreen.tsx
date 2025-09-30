import { Button, Input } from "@/components";
import style from "./PaymentScreen.module.css";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "@/services/store";
import {
  setPaymentInfo,
  TypePaymentPersonalInfo,
} from "@/services/payments/paymentsSlice";
import { useNavigate } from "react-router";
import { useState } from "react";

export const PaymentScreen = () => {
  const { payment } = useAppSelector((state) => state.payments);

  const [isValid, setIsValid] = useState(false);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const personalInfo = [
    {
      labelText: "Фамилия",
      inputName: "lastName",
      value: payment.lastName,
      type: "text",
    },
    {
      labelText: "Имя",
      inputName: "firstName",
      value: payment.firstName,
      type: "text",
    },
    {
      labelText: "Отчество",
      inputName: "patronomic",
      value: payment.patronomic,
      type: "text",
    },
  ];

  const personalContactInfo = [
    {
      labelText: "Контактный телефон",
      inputName: "contactTelephone",
      value: payment.contactTelephone,
      placeholder: "+7 ___ ___ __ __",
      type: "tel",
    },
    {
      labelText: "E-mail",
      inputName: "email",
      value: payment.email,
      placeholder: "inbox@gmail.ru",
      type: "email",
    },
  ];

  const validateFunction = (payment: TypePaymentPersonalInfo) => {
    const fioRegexp = /^[А-Яа-я]+/;
    const telephoneRegexp = /^[+][7][0-9]{10}/;
    const emailRegexp = /^[A-Za-z1-9.\-_]+[@][a-z]+[\\.][a-z]+/;

    const payer = {
      lastName: fioRegexp.test(payment.lastName),
      firstName: fioRegexp.test(payment.firstName),
      patronomic: fioRegexp.test(payment.patronomic),
      contactTelephone: telephoneRegexp.test(payment.contactTelephone),
      email: emailRegexp.test(payment.email),
      payment: true,
    };

    return payer;
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    let newValue = value;

    if (name === "lastName" || name === "firstName" || name === "patronymic") {
      newValue = value.replace(/[^А-Яа-я]/g, "");
    }

    if (name === "contactTelephone") {
      newValue = value.replace(/[^+0-9]/g, "").slice(0, 12);
    }

    if (name === "email") {
      newValue = value.replace(/[А-Яа-я/'"#$%^&*()]/g, "");
    }

    const newPayment = { ...payment, [name]: newValue };

    const errors = validateFunction(newPayment);
    const isValid = Object.values(errors).every((item) => item === true);

    setIsValid(isValid);

    dispatch(
      setPaymentInfo({
        k: name as keyof TypePaymentPersonalInfo,
        value: newValue,
      })
    );
  };

  const className = isValid ? "button__fill_white" : "button__nonactive";

  return (
    <div className={style.payment}>
      <div className={style.payment__data}>
        <PaymentTitle title="Персональные данные" />
        <div className={style.data__personal__info}>
          <div className={style.personal__info__name}>
            {personalInfo.map((personal, index) => (
              <Input
                key={index}
                maxWidth="280px"
                labelText={personal.labelText}
                inputName={personal.inputName}
                value={personal.value}
                type={personal.type}
                onChange={(event) => handleOnChange(event)}
                classNameLabel="payment__label"
              />
            ))}
          </div>
          {personalContactInfo.map((personal, index) => (
            <Input
              key={index}
              maxWidth="360px"
              labelText={personal.labelText}
              inputName={personal.inputName}
              value={personal.value}
              type={personal.type}
              onChange={(event) => handleOnChange(event)}
              placeholder={personal.placeholder}
              classNameLabel="payment__label"
            />
          ))}
        </div>
        <PaymentTitle title="Способ оплаты" />
        <div className={style.data__payment_type}>
          <div className={style.input__radio}>
            <input
              type="radio"
              name="paymentType"
              id="online"
              value="Онлайн"
              onChange={(event) => handleOnChange(event)}
              className={style.input}
            />
            <label htmlFor="online" className={style.label}>
              Онлайн
            </label>
          </div>
          <div className={style.payment_type__list}>
            <p>Банковской картой</p>
            <p>PayPal</p>
            <p>Visa QIWI Wallet</p>
          </div>
        </div>
        <div
          className={classNames(
            style.data__payment_type,
            style.data__payment_type_last
          )}
        >
          <input
            type="radio"
            name="paymentType"
            id="cash"
            value="Наличными"
            onChange={(event) => handleOnChange(event)}
            className={style.input}
          />
          <label htmlFor="cash" className={style.label}>
            Наличными
          </label>
        </div>
      </div>
      <div className={style.payment__button}>
        <Button
          onClick={() => navigate("order")}
          type="button"
          className={className}
        >
          Купить билеты
        </Button>
      </div>
    </div>
  );
};

const PaymentTitle = ({ title }: { title: string }) => {
  return (
    <div className={style.title}>
      <h3>{title}</h3>
    </div>
  );
};
