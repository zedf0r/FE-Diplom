import style from "./Steps.module.css";
import { Step } from "../";
import classNames from "classnames";

type TypeStep = {
  id: number;
  title: string;
};

type TypeStepsProps = TypeStep[];

export const Steps = ({
  steps,
  activeStep,
}: {
  steps: TypeStepsProps;
  activeStep: number;
}) => {
  return (
    <div className={style.list}>
      <div
        className={classNames(style.list__container, {
          [style.list__container_right]: steps.length === activeStep,
        })}
      >
        {steps.map((step) => {
          return (
            <Step
              key={step.id}
              isActive={step.id === activeStep}
              activeStep={activeStep}
              num={step.id}
              title={step.title}
            />
          );
        })}
      </div>
    </div>
  );
};
