import { Check } from "phosphor-react";
import React from "react";
import styled from "styled-components";

type BaseStepProps = {
  children?: React.ReactNode;
};

export interface StepperProps extends BaseStepProps {
  active: number;
}

export interface StepProps extends BaseStepProps {
  icon?: React.ReactNode;
  title?: string;
  readonly status?: "progress" | "completed" | "incomplete";
  readonly description?: string;
}

const StyledStepper = styled("div")`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-inline: auto;
  flex-wrap: wrap;
  .step-splitter {
    height: 0.125rem;
    flex: 1 1 5rem;
    background: ${(props) => props.theme.colorPalette.light01};
  }
  @media (max-width: 64rem) {
    .step-splitter {
      flex: 1 1 0rem;
    }
  }
  @media (max-width: 48rem) {
    gap: 0;
    .step-splitter {
      display: none;
    }
  }
`;
const StyledStep = styled("div")`
  --step-width: 11.875rem;
  width: max-content;
  .step {
    display: flex;
    align-items: center;
    gap: 1rem;
    width: max-content;
    .text {
      margin-block-end: 0.125rem;
      font-size: 0.75rem;
      font-weight: 400;
      color: ${(props) => props.theme.colorPalette.light01};
    }
    &-box-icon {
      background-color: ${(props) => props.theme.colorPalette.light03};
      min-width: 3.375rem;
      height: 3.375rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      font-size: 1.5rem;
      color: ${(props) => props.theme.colors.primary};
      transition: all 0.3s ease-in-out;
      > svg {
        display: block;
      }
    }
    &-body {
      .text-title {
        color: ${(props) => props.theme.colors.primary};
        font-size: 0.875rem;
        font-weight: 500;
      }
      .text-status {
        background: ${(props) => props.theme.colorPalette.light03};
        padding: 0.125rem 0.5rem;
        width: 6rem;
        text-align: center;
        border-radius: 0.875rem;
        font-weight: 500;
        color: ${(props) => props.theme.colorPalette.light01};
        transition: all 0.5s ease-in-out;
      }
    }
  }

  .step.completed {
    .step-box-icon {
      background-color: ${(props) => props.theme.colors.success};
      color: ${(props) => props.theme.colorPalette.white};
      animation: rotate-right 500ms forwards;
    }
    .step-body {
      .text-status {
        background: ${(props) => props.theme.colors.success};
        color: ${(props) => props.theme.colorPalette.white};
      }
    }
  }

  .step.progress {
    .step-box-icon {
      background-color: ${(props) => props.theme.colors.secondary};
      color: ${(props) => props.theme.colorPalette.white};
      animation: rotate-left 500ms forwards;
    }
    .step-body {
      .text-title {
        font-weight: 600;
      }

      .text-status {
        background: ${(props) => props.theme.colors.primary};
        color: ${(props) => props.theme.colors.secondary};
      }
    }
  }

  @keyframes rotate-left {
    0% {
      transform: rotate(360deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }

  @keyframes rotate-right {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  @media (max-width: 80rem) {
    .step {
      display: flex;
      .text {
        margin-block-end: 0.125rem;
        font-size: 0.75rem;
        font-weight: 400;
        color: ${(props) => props.theme.colorPalette.light01};
      }
      &-box-icon {
        min-width: 2.375rem;
        height: 2.375rem;
        > svg {
          width: 1rem;
          height: 1rem;
        }
      }
      &-body {
        .text-status {
          display: none;
        }
      }
    }
  }
  @media (max-width: 48rem) {
    .step {
      display: none;
    }
    .step.progress {
      display: flex;
    }
  }
`;
export const Stepper: React.FC<StepperProps> = function Stepper({
  active,
  children,
}: StepperProps) {
  const stepCount = React.Children.count(children);

  if (stepCount === 0) return <div style={{ width: 0, height: 0 }} />;

  const steps = React.Children.map(
    children as React.ReactElement,
    (child, idx) => {
      let status = "";
      if (active === idx) {
        status = "progress";
      } else if (idx < active) {
        status = "completed";
      } else {
        status = "incomplete";
      }

      if (stepCount === 1) {
        return React.cloneElement(child as JSX.Element, {
          status,
          description: `${child.props.description || "Step"} ${idx + 1}`,
          icon:
            status.toLowerCase() === "completed" ? (
              <Check weight="bold" />
            ) : (
              child.props.icon
            ),
        });
      }

      if (idx + 1 !== stepCount) {
        return [
          React.cloneElement(child as JSX.Element, {
            status,
            description: `${child.props.description || "Step"} ${idx + 1}`,
            icon:
              status.toLowerCase() === "completed" ? (
                <Check weight="bold" />
              ) : (
                child.props.icon
              ),
          }),
          <div
            className={`step-splitter ${status
              .toLowerCase()
              .split(" ")
              .join("")}`}
          />,
        ];
      }

      return React.cloneElement(child as JSX.Element, {
        status,
        description: `${child.props.description || "Step"} ${idx + 1}`,
        icon:
          status.toLowerCase() === "completed" ? (
            <Check weight="bold" />
          ) : (
            child.props.icon
          ),
      });
    }
  );
  return <StyledStepper>{steps}</StyledStepper>;
};

export const Step: React.FC<StepProps> = function Step({
  title,
  icon,
  status,
  description,
}: StepProps) {
  let strStatus = "Incomplete";
  if (status === "progress") strStatus = "Progress";
  if (status === "completed") strStatus = "Completed";

  return (
    <StyledStep>
      <div className={`step ${status}`}>
        <span className="step-box-icon">{icon}</span>
        <div className="step-body">
          <p className="text text-description">{description}</p>
          <h4 className="text text-title">{title}</h4>
          <p className="text text-status">{strStatus}</p>
        </div>
      </div>
    </StyledStep>
  );
};
