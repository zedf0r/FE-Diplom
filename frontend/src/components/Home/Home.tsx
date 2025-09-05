import { Form } from "..";
import style from "./Home.module.css";

export const Home = () => {
  return (
    <section className={style.home}>
      <div className="container">
        <div className={style.home__info}>
          <Form gap="small__gap" />
        </div>
      </div>
    </section>
  );
};
