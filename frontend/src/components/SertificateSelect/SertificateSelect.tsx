import style from "./SertificateSelect.module.css";

type TypeOptions = {
  value: string;
  title: string;
};

export const SertificateSelect = ({
  maxWidth,
  onChange,
  options,
  name,
}: {
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: TypeOptions[];
  name: "age" | "document";
  maxWidth?: string;
}) => {
  return (
    <div className={style.info__select} style={{ maxWidth: maxWidth }}>
      <select
        className={style.select}
        name={name}
        onChange={(event) => onChange(event)}
      >
        {options.map((option, index) => {
          return (
            <option key={index} value={option.value}>
              {option.title}
            </option>
          );
        })}
      </select>
    </div>
  );
};
