import style from "./CountTickets.module.css";

type TypeTicketsParams = {
  age: string;
  count: number;
  info?: string;
  place?: string;
};

export const CountTickets = () => {
  const ticketsCount: TypeTicketsParams[] = [
    { age: "Взрослый", count: 2, info: "Можно добавить еще 3 пассажиров " },
    {
      age: "Детский",
      count: 1,
      info: "Можно добавить еще 3 детей до 10 лет.Свое место в вагоне, как у взрослых дешевле в среднем на 50-65%",
    },
    { age: "Детский", place: "«без места»", count: 2 },
  ];

  return (
    <div className={style.count__tickets}>
      <h3 className={style.tickets__variant_title}>Количество билетов</h3>
      <div className={style.ticket}>
        {ticketsCount.map((ticket) => {
          return <Count ticket={ticket} />;
        })}
      </div>
    </div>
  );
};

const Count = ({ ticket }: { ticket: TypeTicketsParams }) => {
  return (
    <div className={style.tickets__box}>
      <div className={style.count__box}>
        <span>
          {ticket.age} {ticket.place} - {ticket.count}
        </span>
      </div>
      <p>{ticket.info}</p>
    </div>
  );
};
