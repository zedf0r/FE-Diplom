import style from "./Button.module.css";

type TypeButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
};
export const Button = ({ onClick, children }: TypeButtonProps) => {
  return (
    <button type="button" className={style.button} onClick={onClick}>
      {children}
    </button>
  );
};
