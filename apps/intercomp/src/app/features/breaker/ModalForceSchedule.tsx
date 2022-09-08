import {
  Box,
  Button,
  FlexItem,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalFoot,
  ModalHead,
  Select,
  TextView,
  ToastKind,
  useToast,
} from "ui/sc";
import type { IconProps } from "phosphor-react";
import dynamic from "next/dynamic";
import styled from "styled-components";
import type { BaseModalProps } from "src/lib/constants";
import React, { useId } from "react";
import { proxy } from "src/lib/service";
import { convertHouseInSecond } from "core/utils";
import {
  ForceScheduleKind,
  forceScheduleReducer,
  INITIAL_STATE_FORCE_SCHEDULE,
} from "./reducer";

export type ModalForceScheduleProps = BaseModalProps & {
  serial: string;
};

const StyledModalForceUpdateBody = styled("div")`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;

  .header {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .schedule {
    display: flex;
    flex-direction: column;

    .custom-select,
    .custom-input {
      .label {
        font-size: 12px;
        font-weight: 500;
      }

      .container {
        padding: 0.5rem 0.5rem;
        border: 1px solid ${(props) => props.theme.colors.body3};
        border-radius: 8px;
      }

      .icon {
        color: ${(props) => props.theme.colors.body3};
      }
    }

    &Item {
      display: flex;
      flex-direction: column;
    }
  }

  @media only screen and (min-width: 768px) {
    .schedule {
      &Item {
        display: flex;
        flex-direction: row;
        column-gap: 1rem;
      }
    }
  }
`;

const X = dynamic<IconProps>(() =>
  import("phosphor-react").then((mod) => mod.X)
);

const Calendar = dynamic<IconProps>(() =>
  import("phosphor-react").then((mod) => mod.Calendar)
);

const Clock = dynamic<IconProps>(() =>
  import("phosphor-react").then((mod) => mod.Clock)
);

export default function ModalForceSchedule({
  isOpen,
  handleClose,
  serial,
}: ModalForceScheduleProps): JSX.Element {
  const formId = useId();

  const [stateForceSchedule, dispatchForceSchedule] = React.useReducer(
    forceScheduleReducer,
    INITIAL_STATE_FORCE_SCHEDULE
  );

  const { dispatchToast } = useToast();
  const [formData, setFormData] = React.useState({
    day: "",
    from: "",
    to: "",
  });

  const { day, from, to } = formData;

  React.useEffect(() => {
    if (!isOpen) return;

    if (stateForceSchedule.isSuccess) {
      dispatchToast({
        type: ToastKind.Add,
        payload: {
          type: "success",
          title: "Success Force Schedule",
          description: `Force schedule success for breaker ${serial}`,
          id: Math.random(),
        },
      });

      dispatchForceSchedule({ type: ForceScheduleKind.Reset });
    }

    if (stateForceSchedule.isError) {
      dispatchToast({
        type: ToastKind.Add,
        payload: {
          type: "success",
          title: "Success Force Schedule",
          description: `Force schedule success for breaker ${serial}`,
          id: Math.random(),
        },
      });

      dispatchForceSchedule({ type: ForceScheduleKind.Reset });
    }
  }, [
    stateForceSchedule.isError,
    stateForceSchedule.isSuccess,
    dispatchToast,
    serial,
    isOpen,
  ]);

  const handleCloseAndReset = () => {
    handleClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatchForceSchedule({ type: ForceScheduleKind.Pending });
    proxy
      .post("/proxy/force-schedule", {
        serial,
        schedule: {
          day,
          start: convertHouseInSecond(from).toString(),
          finish: convertHouseInSecond(to).toString(),
        },
      })
      .then(() => {
        dispatchForceSchedule({ type: ForceScheduleKind.Fullfilled });
      })
      .catch(() => {
        dispatchForceSchedule({ type: ForceScheduleKind.Rejected });
      });
  };

  return (
    <Modal
      isOpen={isOpen}
      handleClose={handleClose}
      palette="primary"
      scroll="content"
      size="small"
      round
    >
      <ModalHead flex>
        <TextView flex={1} color="white">
          Force Update Today Schedule
        </TextView>
        <IconButton palette="error" onClick={handleCloseAndReset}>
          <X />
        </IconButton>
      </ModalHead>

      <ModalBody>
        <StyledModalForceUpdateBody>
          <Box className="header">
            <TextView fontWeight={500} fontSize="1rem" color="body3">
              Reset Component
            </TextView>
            <TextView fontWeight={400} fontSize="10px" color="body3">
              Give orders to one or all components to perform the restart
              procedure, each time the restart button is pressed.
            </TextView>
          </Box>
          <form onSubmit={handleSubmit} id={formId} className="schedule">
            <Select
              value={day}
              name="day"
              onChange={handleChange}
              variant="plain"
              fullWidth
              label="Update Day"
            >
              <option value=""></option>
              <option value="minggu">Sunday</option>
              <option value="senin">Monday</option>
              <option value="selasa">Tuesday</option>
              <option value="rabu">Wednesday</option>
              <option value="kamis">Thursday</option>
              <option value="jumat">Friday</option>
              <option value="sabtu">Saturday</option>
            </Select>
            <Box className="scheduleItem">
              <Input
                className="scheduleItem-input"
                fullWidth
                label="From"
                palette="primary"
                variant="plain"
                type="time"
                value={from}
                name="from"
                onChange={handleChange}
              />

              <Input
                className="scheduleItem-input"
                fullWidth
                label="To"
                palette="primary"
                variant="plain"
                type="time"
                value={to}
                name="to"
                onChange={handleChange}
              />
            </Box>
          </form>
        </StyledModalForceUpdateBody>
      </ModalBody>
      <ModalFoot flex>
        <FlexItem flex={1}>
          <Button
            palette="secondary"
            type="button"
            size="small"
            variant="outline"
            onClick={handleCloseAndReset}
            fullWidth
          >
            <TextView>Close</TextView>
          </Button>
        </FlexItem>

        <FlexItem flex={1}>
          <Button
            palette="secondary"
            type="submit"
            size="small"
            disabled={stateForceSchedule.isLoading}
            variant="contain"
            form={formId}
            fullWidth
          >
            {stateForceSchedule.isLoading ? (
              <TextView>Loading...</TextView>
            ) : (
              <TextView>Submit</TextView>
            )}
          </Button>
        </FlexItem>
      </ModalFoot>
    </Modal>
  );
}
