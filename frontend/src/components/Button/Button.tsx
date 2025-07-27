import style from "./Button.module.css";

type TypeButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  className: string;
};
export const Button = ({ onClick, children, className }: TypeButtonProps) => {
  const cssColor = className;
  return (
    <button
      type="button"
      className={`${style.button} ${style[cssColor]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
