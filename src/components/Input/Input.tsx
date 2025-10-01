import classNames from "classnames";
import style from "./Input.module.css";

export const Input = ({
  maxWidth,
  labelText,
  inputName,
  value,
  type,
  classNameLabel,
  error,
  maxLength,
  placeholder,

  onChange,
}: {
  maxWidth: string;
  labelText: string;
  type: string;
  inputName: string;
  value: string;
  classNameLabel?: string;
  placeholder?: string;

  error?: boolean;
  maxLength?: number;

  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className={style.input__box} style={{ maxWidth: maxWidth }}>
      <label
        htmlFor={inputName}
        className={classNames(style.label, {
          [style[classNameLabel!]]: classNameLabel ? classNameLabel : null,
        })}
      >
        {labelText}
      </label>
      <input
        type={type}
        className={classNames(style.input, { [style.error]: error })}
        name={inputName}
        id={inputName}
        value={value}
        onChange={(event) => onChange(event)}
        maxLength={maxLength}
        placeholder={placeholder}
        required
      />
    </div>
  );
};
