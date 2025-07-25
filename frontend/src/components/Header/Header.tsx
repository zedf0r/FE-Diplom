import style from "./Header.module.css";

export const Header = () => {
  return (
    <header className={style.header}>
      <div className={style.logo}>
        <div className="container">
          <h3 className={style.logo__text}>Лого</h3>
        </div>
      </div>
      <nav className={style.nav}>
        <div className="container">
          <ul className={style.list}>
            <li className={style.list__item}>
              <a href="#" className={style.list__item_link}>
                О нас
              </a>
            </li>
            <li className={style.list__item}>
              <a href="#" className={style.list__item_link}>
                Как это работает
              </a>
            </li>
            <li className={style.list__item}>
              <a href="#" className={style.list__item_link}>
                Отзывы
              </a>
            </li>
            <li className={style.list__item}>
              <a href="#" className={style.list__item_link}>
                Контакты
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};
