import style from "./Checkbox.module.css";

type TypeCheckboxProps = {
  name: string;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Checkbox = ({ name, label, onChange }: TypeCheckboxProps) => {
  return (
    <div className={style.checkbox__wrap}>
      <input
        type="checkbox"
        name={name}
        id={name}
        onChange={(event) => onChange(event)}
        className={style.checkbox}
      />
      <label htmlFor={name} className={style.label}>
        {label}
      </label>
    </div>
  );
};
