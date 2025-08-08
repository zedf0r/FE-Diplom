import style from "./Form.module.css";
import { Button, DateRange, Selection } from "../";
import { ArrowReverseIcon } from "../Icons";
import { Link } from "react-router";
import classNames from "classnames";

export const Form = ({ gap }: { gap: string }) => {
  const handleClick = () => {};

  return (
    <form className={classNames(style.form, style[gap])}>
      <div className={style.form__chose}>
        <div className={style.form__info}>
          <span className={style.form__title}>Направление</span>
          <div className={style.direction__select}>
            <Selection placeholder="От куда" />
            <button type="button" className={style.button}>
              <ArrowReverseIcon />
            </button>
            <Selection placeholder="Куда" />
          </div>
        </div>
        <div className={style.form__info}>
          <span className={style.form__title}>Дата</span>
          <div className={style.date__picker}>
            <DateRange width="calc(50% - 18px)" height="60px" />
          </div>
        </div>
      </div>
      <div className={style.form__button}>
        <Link to="/catalog">
          <Button type="button" onClick={handleClick} className="button__fill">
            Найти билеты
          </Button>
        </Link>
      </div>
    </form>
  );
};
