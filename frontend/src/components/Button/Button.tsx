import style from "./Button.module.css";

type TypeButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  className: string;
  type: "button" | "submit" | "reset";
};
export const Button = ({
  onClick,
  children,
  className,
  type,
}: TypeButtonProps) => {
  const cssColor = className;
  return (
    <button
      type={type}
      className={`${style.button} ${style[cssColor]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
