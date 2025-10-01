import { Form } from "@/components";
import style from "./Home.module.css";

export const Home = () => {
  return (
    <section className={style.home}>
      <div className="container">
        <div className={style.home__info}>
          <h1 className={style.home__info_title}>
            Вся жизнь -{" "}
            <span className={style.home__info_title_text}>путешествие!</span>
          </h1>
          <Form gap="big__gap" />
        </div>
      </div>
    </section>
  );
};
