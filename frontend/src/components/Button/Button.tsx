import style from "./Button.module.css";
import classNames from "classnames";

type TypeButtonProps = {
  onClick?: () => void;
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
  return (
    <button
      type={type}
      className={classNames(style.button, style[className])}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
