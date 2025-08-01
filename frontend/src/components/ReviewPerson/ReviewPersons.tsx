import style from "./ReviewPerson.module.css";

type TypePersonProps = {
  id: number;
  img: string;
  name: string;
  text: string;
};

export const ReviewPersons = ({ persons }: { persons: TypePersonProps[] }) => {
  return (
    <div className={style.reviews__carousel}>
      {persons.map((person) => {
        return (
          <div key={person.id} className={style.reviews__person}>
            <div className={style.person__img}>
              <img className={style.img} src={person.img} alt="Аватар" />
            </div>
            <div className={style.person__info}>
              <p className={style.name}>{person.name}</p>
              <p className={style.review__text}>
                <span className={`${style.review__text_high}`}>“</span>
                {person.text}
                <span className={`${style.review__text_bottom}`}>”</span>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
