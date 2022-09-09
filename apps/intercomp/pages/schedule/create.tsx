import type { NextLayout } from "next";
import React from "react";
import dynamic from "next/dynamic";
import styled from "styled-components";
import { Box, Button, ButtonLink, StepperProps, StepProps } from "ui/sc";
import { Input, Layout } from "components";
import type { IconProps } from "phosphor-react";

const StyledCreateSchedule = styled("section")`
  .createSchedule-header {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    column-gap: 2rem;
    row-gap: 1rem;

    &Cancel {
      display: none;
    }

    &Stepper {
      margin-inline: auto;
      flex: 4;
    }

    &Nav {
      display: flex;
      align-items: center;
      gap: 1rem;
      flex: 1;

      button {
        flex: 1;
      }
    }
  }

  .createSchedule-content {
    margin-block-start: 2rem;
    .stepOne {
      .custom-input {
        width: 100%;

        .label {
          font-size: 20px;
          font-weight: 600;
        }

        .container {
          width: 100%;
        }
      }

      &-form {
        display: flex;
        flex-direction: column;
        row-gap: 1rem;

        &Date {
          display: flex;
          flex-direction: column;
          row-gap: 1rem;
        }
      }
    }

    .stepTwo {
      background: red;
    }

    .summary {
    }
  }

  @media only screen and (min-width: 768px) {
    .createSchedule-content {
      .stepOne {
        &-form {
          display: flex;
          flex-direction: row;
          row-gap: 0;
          align-items: center;
          column-gap: 1rem;

          &Date {
            display: flex;
            flex-direction: row;
            align-items: center;
            row-gap: 0;
            column-gap: 1rem;
            margin-inline-start: auto;
          }
        }
      }
    }
  }

  @media only screen and (min-width: 1000px) {
    .createSchedule-header {
      &Cancel {
        display: block;
      }
    }
  }
`;

const Stepper = dynamic<StepperProps>(() =>
  import("ui/sc").then((mod) => mod.Stepper)
);
const Step = dynamic<StepProps>(() => import("ui/sc").then((mod) => mod.Step));
const Calendar = dynamic<IconProps>(() =>
  import("phosphor-react").then((mod) => mod.Calendar)
);
const Cpu = dynamic<IconProps>(() =>
  import("phosphor-react").then((mod) => mod.Cpu)
);

const CreateSchedule: NextLayout = function Sensor() {
  const [step, setStep] = React.useState<number>(0);

  const handleNextStep = () => {
    if (step === 0) {
      // do something
      console.log(step, "step 1");
    }
    if (step === 1) {
      // do something
      console.log(step, "step 2");
    }
    setStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    if (step === 0) {
      setStep(0);
      return;
    }
    setStep((prev) => prev - 1);
  };

  return (
    <StyledCreateSchedule aria-label="create schedule page">
      <Box className="createSchedule-header">
        <div className="createSchedule-headerCancel">
          <ButtonLink
            href="/schedule"
            variant="outline"
            palette="secondary"
            size="small"
          >
            Cancel
          </ButtonLink>
        </div>
        <div className="createSchedule-headerStepper">
          <Stepper active={step}>
            <Step title="Set Schedule" icon={<Calendar weight="fill" />} />
            <Step title="Choose Device" icon={<Cpu weight="fill" />} />
          </Stepper>
        </div>
        <div className="createSchedule-headerNav">
          {step > 0 && (
            <Button
              variant="outline"
              onClick={handlePrevStep}
              palette="secondary"
              size="small"
            >
              Prev
            </Button>
          )}

          <Button
            variant="contain"
            onClick={step <= 1 ? handleNextStep : () => {}}
            palette="secondary"
            size="small"
            form="createForm"
            type={step <= 1 ? "button" : "submit"}
          >
            {step <= 1 ? "Next" : "Create"}
          </Button>
        </div>
      </Box>

      <Box className="createSchedule-content">
        <StepOne step={step} />
        <StepTwo step={step} />
        <Summary step={step} />
      </Box>
    </StyledCreateSchedule>
  );
};

export default CreateSchedule;

CreateSchedule.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout title="Time Schedule">{page}</Layout>;
};

function StepOne({ step }: { step: number }) {
  if (step === 0) {
    return (
      <section className="stepOne">
        <form className="stepOne-form">
          <Input type="text" variant="plain" label="Schedule Name" required />
          <div className="stepOne-formDate">
            <Input type="date" variant="plain" label="Start Date" required />
            <Input type="date" variant="plain" label="End Date" required />
          </div>
        </form>
      </section>
    );
  }

  return null;
}

function StepTwo({ step }: { step: number }) {
  if (step === 1) {
    return (
      <section className="stepTwo">
        <h3>iam step two</h3>
      </section>
    );
  }

  return null;
}

function Summary({ step }: { step: number }) {
  if (step === 2) {
    return (
      <section className="summary">
        <h3>summary</h3>
      </section>
    );
  }

  return null;
}
