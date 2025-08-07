import { Card, Filter } from "../../../../components";
import style from "./Catalog.module.css";

export const Catalog = () => {
  return (
    <section className={style.catalog}>
      <div className="container">
        <Filter />
        <div className={style.trains__container}>
          <Card />
        </div>
      </div>
    </section>
  );
};
