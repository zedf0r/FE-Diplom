import { Card, Filter } from "../../../../components";
import { useAppSelector } from "../../../../services/store";
import type { TypeTicket } from "../../../../types";
import style from "./Catalog.module.css";

export const Catalog = () => {
  const { isLoading, tickets } = useAppSelector((state) => state.tickets);

  return (
    <section className={style.catalog}>
      <div className={style.catalog__container}>
        <Filter />
        <div className={style.cards}>
          {isLoading
            ? "Загрузка"
            : tickets.items?.map((ticket: TypeTicket) => {
                return (
                  <Card key={ticket.departure.train._id} ticket={ticket} />
                );
              })}
        </div>
      </div>
    </section>
  );
};
