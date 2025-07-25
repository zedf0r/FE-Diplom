import style from "./Form.module.css";
import { Icon, Selection } from "../";

export const Form = () => {
  return (
    <form className={style.form}>
      <div className={style.direction}>
        <span>Направление</span>
        <div className={style.direction__select}>
          <Selection placeholder="От куда" />
          <Icon className="geoposition" id="geoposition" />
        </div>
      </div>
    </form>
  );
};
