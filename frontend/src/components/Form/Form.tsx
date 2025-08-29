import style from "./Form.module.css";
import { Button, DateRange, Selection } from "../";
import { ArrowReverseIcon } from "../Icons";
import { useNavigate } from "react-router";
import classNames from "classnames";
import { fetchHelper } from "../../helper/fetchHelper";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { setTikets, setIsLoading } from "../../services/tickets/ticketsSlice";
import { onChangeFilter } from "../../services/filters/filtersSlice";

export const Form = ({ gap }: { gap: string }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector((state) => state.filters);

  const handleClick = () => {
    fetchDate();
    navigate("/catalog");
  };

  const fetchDate = async () => {
    dispatch(setIsLoading(true));
    try {
      const data = await fetchHelper({
        method: "GET",
        url: `/routes?from_city_id=${filters.from_city_id}&to_city_id=${filters.to_city_id}&limit=${filters.limit}&sort=${filters.sort}`,
      });
      dispatch(
        setTikets({
          total_count: data.total_count,
          items: data.items,
        })
      );
    } catch (error) {
      dispatch(
        setTikets({
          total_count: 0,
          items: [],
        })
      );
      throw new Error(`Ошибка загрузки билетов ${error}`);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return (
    <form className={classNames(style.form, style[gap])}>
      <div className={style.form__chose}>
        <div className={style.form__info}>
          <span className={style.form__title}>Направление</span>
          <div className={style.direction__select}>
            <Selection
              placeholder="От куда"
              handleSetCity={(id: string) =>
                dispatch(onChangeFilter({ key: "from_city_id", value: id }))
              }
            />
            <button type="button" className={style.button}>
              <ArrowReverseIcon />
            </button>
            <Selection
              placeholder="Куда"
              handleSetCity={(id: string) =>
                dispatch(onChangeFilter({ key: "to_city_id", value: id }))
              }
            />
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
