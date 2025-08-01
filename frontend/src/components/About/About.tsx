import style from "./About.module.css";
import classNames from "classnames";

export const About = () => {
  return (
    <section className={style.about}>
      <div className="container">
        <div className={style.about__content}>
          <h2 className={style.about__title}>О нас</h2>
          <div className={style.about__textbox}>
            <p className={style.about__text}>
              Мы рады видеть вас! Мы работаем для Вас с 2003 года. 14 лет мы
              наблюдаем, как с каждым днем все больше людей заказывают жд билеты
              через интернет.
            </p>
            <p className={style.about__text}>
              Сегодня можно заказать железнодорожные билеты онлайн всего в 2
              клика, но стоит ли это делать? <br /> Мы расскажем о преимуществах
              заказа через интернет.
            </p>
            <p
              className={classNames(style.about__text, style.about__text_bold)}
            >
              Покупать жд билеты дешево можно за 90 суток до отправления поезда.
              <br />
              Благодаря динамическому ценообразованию цена на билеты в это время
              самая низкая.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
