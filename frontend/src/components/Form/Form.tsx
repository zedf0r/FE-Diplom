import style from "./Form.module.css";
import { Button, DateRange, Selection } from "../";
import { ArrowReverseIcon } from "../Icons";
import { useNavigate } from "react-router";
import classNames from "classnames";
import { fetchHelper } from "../../helper/fetchHelper";
import { useAppSelector } from "../../services/store";

export const Form = ({ gap }: { gap: string }) => {
  const navigate = useNavigate();
  const { searchParams } = useAppSelector((state) => state.tickets);

  const handleClick = () => {
    fetchDate();
    console.log(searchParams);
    navigate("/catalog");
  };

  const fetchDate = async () => {
    const data = await fetchHelper({
      method: "GET",
      url: `/routes?from_city_id=67ceb6548c75f00047c8f78d&to_city_id=67ceb6548c75f00047c8f78e`,
    });
  };

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
        <Button type="button" onClick={handleClick} className="button__fill">
          Найти билеты
        </Button>
      </div>
    </form>
  );
};
