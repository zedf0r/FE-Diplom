import style from "./Tariff.module.css";

type TypeTariffProps = {
  variant: string;
  count: number;
  price?: number;
};

export const Tariff = ({ variant, count, price }: TypeTariffProps) => {
  return (
    <div className={style.tariff}>
      <span className={style.tarrif__variant}>{variant}</span>
      <span className={style.tarrif__count}>{count}</span>

      <p className={style.tarrif__price}>
        <span className={style.tarrif__text}>от</span>
        {price}
        <span className={style.tarrif__valute}>&#8381;</span>
      </p>
    </div>
  );
};
