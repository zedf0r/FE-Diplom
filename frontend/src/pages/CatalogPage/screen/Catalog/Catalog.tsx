import { Card, Filter } from "../../../../components";
import style from "./Catalog.module.css";

export const Catalog = () => {
  return (
    <section className={style.catalog}>
      <div className={style.catalog__container}>
        <Filter />
        <Card />
      </div>
    </section>
  );
};
