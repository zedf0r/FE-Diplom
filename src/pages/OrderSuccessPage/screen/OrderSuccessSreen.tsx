import { useAppSelector } from "@/services/store";
import style from "./OrderSuccessSreen.module.css";
import {
  ChatIcon,
  ComputerIcon,
  ConciergeIcon,
  StarIcon,
} from "@/components/Icons";
import { Button } from "@/components";

export const OrderSuccessSreen = () => {
  const { totalPrice } = useAppSelector((state) => state.tickets);
  const { payment } = useAppSelector((state) => state.payments);

  const aboutToDo = [
    {
      component: <ComputerIcon />,
      text: "билеты будут отправлены на ваш e-mail",
    },
    {
      component: <ChatIcon />,
      text: "распечатайте и сохраняйте билеты до даты поездки",
    },
    {
      component: <ConciergeIcon />,
      text: "предьявите распечатанные билеты при посадке",
    },
  ];

  const adultTotalPrice =
    totalPrice.arrivalPrice.adultPrice + totalPrice.departurePrice.adultPrice;
  const childTotalPrice =
    totalPrice.arrivalPrice.childPrice + totalPrice.departurePrice.childPrice;
  const serviceTotalPrice =
    totalPrice.arrivalPrice.servicePrice +
    totalPrice.departurePrice.servicePrice;
  return (
    <>
      <div className={style.success_bg}></div>
      <div className="container">
        <div className={style.success}>
          <h2 className={style.success__title}>Благодарим Вас за заказ!</h2>
          <div className={style.success__info}>
            <div className={style.success__about}>
              <div className={style.about__header}>
                <p className={style.about__header__title}>№Заказа 285АА</p>
                <p className={style.about__header__total}>
                  сумма{" "}
                  <span className={style.about__header__total_price}>
                    {(
                      adultTotalPrice +
                      childTotalPrice +
                      serviceTotalPrice
                    ).toLocaleString()}
                  </span>{" "}
                  <span>₽</span>
                </p>
              </div>
            </div>
            <div className={style.about__todo}>
              <div className={style.about__todo__inner}>
                {aboutToDo.map((item, index) => {
                  return (
                    <div key={index} className={style.todo}>
                      <div className={style.todo__svg}>{item.component}</div>
                      <p>{item.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={style.about__main}>
              <div className={style.main__info}>
                <p className={style.main__info_name}>
                  {payment.firstName}
                  {payment.patronomic}
                </p>
                <p className={style.main__info_text}>
                  Ваш заказ успешно оформлен. В ближайшее время с вами свяжется
                  наш оператор для подтверждения.
                </p>
                <p className={style.main__info_text}>
                  Благодарим Вас за оказанное доверие и желаем приятного
                  путешествия!
                </p>
              </div>
            </div>
            <div className={style.about__footer}>
              <div className={style.about__footer_rate}>
                <p>Оценить сервис</p>
                <div className={style.about__footer_rate_star}>
                  {Array.from({ length: 5 }, (_, index) => (
                    <StarIcon key={index} />
                  ))}
                </div>
              </div>
              <Button type="button" className="button__transparrent_big">
                вернуться на главную
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
