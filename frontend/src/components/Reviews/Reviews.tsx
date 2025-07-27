import style from "./Reviews.module.css";
import { Carousel } from "antd";
import { ReviewPerson } from "../";
import avatar1 from "../../img/avatar_1.png";
import avatar2 from "../../img/avatar_2.png";

export const Reviews = () => {
  const persons = [
    {
      id: 1,
      img: avatar1,
      name: "Екатерина Вальнова",
      text: "Доброжелательные подсказки на всех этапах помогут правильно заполнить поля и без затруднений купить авиа или ж/д билет, даже если вы заказываете онлайн билет впервые.",
    },
    {
      id: 2,
      img: avatar2,
      name: "Евгений Стрыкало",
      text: "СМС-сопровождение до посадки Сразу после оплаты ж/д билетов и за 3 часа до отправления мы пришлем вам СМС-напоминание о поездке.",
    },
  ];
  return (
    <section className={style.reviews}>
      <div className="container">
        <div className={style.reviews__content}>
          <h2 className={style.reviews__title}>Отзывы</h2>
          <Carousel
            dots
            // autoplay
            autoplaySpeed={3000}
            dotPosition="bottom"
          >
            <ReviewPerson persons={persons} />
            <ReviewPerson persons={persons} />
            <ReviewPerson persons={persons} />
          </Carousel>
        </div>
      </div>
    </section>
  );
};
