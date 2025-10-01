import style from "./Loading.module.css";
import loadingGif from "@/assets/img/loading.gif";

export const Loading = () => {
  return (
    <section className={style.loading}>
      <p>Идет поиск</p>
      <div className={style.img}>
        <img src={loadingGif} alt="Загрузка..." className={style.gif} />
      </div>
    </section>
  );
};
