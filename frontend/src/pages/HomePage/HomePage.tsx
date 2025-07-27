import { Form, About, Advantages } from "../../components";
import style from "./HomePage.module.css";

export const HomePage = () => {
  return (
    <main>
      <section className={style.home}>
        <div className="container">
          <div className={style.home__info}>
            <h1 className={style.home__info_title}>
              Вся жизнь -{" "}
              <span className={style.home__info_title_text}>путешествие!</span>
            </h1>
            <Form />
          </div>
        </div>
      </section>
      <About />
      <Advantages />
    </main>
  );
};
