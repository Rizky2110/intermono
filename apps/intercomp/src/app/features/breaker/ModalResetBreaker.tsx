import {
  Box,
  Button,
  FlexItem,
  IconButton,
  Modal,
  ModalBody,
  ModalFoot,
  ModalHead,
  TextView,
  ToastKind,
  useToast,
} from "ui/sc";
import { BaseModalProps } from "src/lib/constants";
import styled from "styled-components";
import dynamic from "next/dynamic";
import type { IconProps } from "phosphor-react";
import { useAppDispatch, useAppSelector } from "src/app/hook";
import React from "react";
import { configRestart, configUpdate, resetBreaker } from "./breakerSlice";

const StyledModalResetBreakerBody = styled("div")`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;

  .header {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .configuration {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-block-end: 1rem;

    &Item {
      display: flex;
      flex-direction: column;
      row-gap: 1rem;

      .icon {
        color: ${(props) => props.theme.colors.secondary};
        display: block;
      }

      &-icon {
        background: ${(props) => props.theme.colors.body2};
        border-radius: 6px;
        width: 42px;
        height: 42px;
        padding: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      &-content {
        background: transparent;
        display: flex;
        flex-direction: column;
        line-height: 1.5;
      }
    }
  }

  @media only screen and (min-width: 768px) {
    .configuration {
      &Item {
        flex-direction: row;
        row-gap: 0;
        column-gap: 1.2rem;
        align-items: center;

        .icon {
          color: ${(props) => props.theme.colors.secondary};
          display: block;
        }

        &-icon {
          background: ${(props) => props.theme.colors.body2};
          border-radius: 6px;
          width: fit-content;
          padding: 5px;
        }

        &-content {
          flex: 1;
          background: transparent;
          display: flex;
          flex-direction: column;
          line-height: 1.5;
        }
      }
    }
  }
`;

const X = dynamic<IconProps>(() =>
  import("phosphor-react").then((mod) => mod.X)
);

const Cpu = dynamic<IconProps>(() =>
  import("phosphor-react").then((mod) => mod.Cpu)
);

const ClockClockwise = dynamic<IconProps>(() =>
  import("phosphor-react").then((mod) => mod.ClockClockwise)
);

export type ModalResetBreakerProps = BaseModalProps & {
  serial: string;
};

type ButtonAttributes = {
  "data-option": {
    value:
      | "restart_breaker"
      | "restart_modem"
      | "restart_tv"
      | "restart_addon"
      | "force_relay"
      | "version_update";
  };
};

export default function ModalResetBreaker({
  isOpen,
  handleClose,
  serial,
}: ModalResetBreakerProps): JSX.Element {
  const dispatch = useAppDispatch();
  const { dispatchToast } = useToast();
  const { isLoading, isSuccessRestart, isErrorRestart } = useAppSelector(
    (state) => state.breaker
  );
  const handleCloseAndReset = () => {
    handleClose();
  };

  React.useEffect(() => {
    if (!isOpen) return;

    if (isSuccessRestart) {
      dispatchToast({
        type: ToastKind.Add,
        payload: {
          type: "success",
          title: "Success Restart",
          description: "Your resart config is success",
          id: Math.random(),
        },
      });
      dispatch(resetBreaker());
    }

    if (isErrorRestart) {
      dispatchToast({
        type: ToastKind.Add,
        payload: {
          type: "error",
          title: "Failed Restart",
          description: "Your resart config is fail",
          id: Math.random(),
        },
      });
      dispatch(resetBreaker());
    }
  }, [isOpen, isSuccessRestart, isErrorRestart, dispatch, dispatchToast]);

  const handleConfig = (evt: React.MouseEvent<HTMLElement>) => {
    const { value } = (
      evt.currentTarget.attributes as unknown as ButtonAttributes
    )["data-option"];

    dispatch(
      configRestart({
        datas: {
          option: value,
          serial: serial,
          value: 20,
        },
      })
    );
  };

  const handleUpdate = (evt: React.MouseEvent<HTMLElement>) => {
    const { value } = (
      evt.currentTarget.attributes as unknown as ButtonAttributes
    )["data-option"];

    dispatch(
      configUpdate({
        datas: {
          option: value,
          serial: serial,
        },
      })
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      handleClose={handleClose}
      palette="primary"
      scroll="content"
      size="large"
      disabled={isLoading}
      round
    >
      <ModalHead flex>
        <TextView flex={1} color="white">
          Breaker Configuration
        </TextView>
        <IconButton palette="error" onClick={handleCloseAndReset}>
          <X />
        </IconButton>
      </ModalHead>

      <ModalBody>
        <StyledModalResetBreakerBody>
          <Box className="header">
            <TextView fontWeight={500} fontSize="1rem" color="body3">
              Reset Component
            </TextView>
            <TextView fontWeight={400} fontSize="12px" color="body2">
              Give orders to one or all components to perform the restart
              procedure, each time the restart button is pressed
            </TextView>
          </Box>

          <Box className="configuration">
            <Box className="configurationItem">
              <Box className="configurationItem-icon">
                <Cpu weight="fill" className="icon" size={32} />
              </Box>

              <Box className="configurationItem-content">
                <TextView fontSize="14px" fontWeight={500} color="primary">
                  Breaker
                </TextView>
                <TextView fontSize="10px" fontWeight={500} color="body3">
                  after you press the restart button, the breaker device will
                  automatically restart for 20 seconds
                </TextView>
              </Box>

              <Box className="configurationItem-button">
                <Button
                  startIcon={
                    <ClockClockwise weight="bold" size={24} className="icon" />
                  }
                  data-option="restart_breaker"
                  onClick={handleConfig}
                >
                  Restart
                </Button>
              </Box>
            </Box>

            <Box className="configurationItem">
              <Box className="configurationItem-icon">
                <Cpu weight="fill" className="icon" size={32} />
              </Box>

              <Box className="configurationItem-content">
                <TextView fontSize="14px" fontWeight={500} color="primary">
                  Modem
                </TextView>
                <TextView fontSize="10px" fontWeight={500} color="body3">
                  after you press the restart button, the modem device will
                  automatically restart for 20 seconds
                </TextView>
              </Box>

              <Box className="configurationItem-button">
                <Button
                  startIcon={
                    <ClockClockwise weight="bold" size={24} className="icon" />
                  }
                  data-option="restart_modem"
                  onClick={handleConfig}
                >
                  Restart
                </Button>
              </Box>
            </Box>

            <Box className="configurationItem">
              <Box className="configurationItem-icon">
                <Cpu weight="fill" className="icon" size={32} />
              </Box>

              <Box className="configurationItem-content">
                <TextView fontSize="14px" fontWeight={500} color="primary">
                  Smart TV
                </TextView>
                <TextView fontSize="10px" fontWeight={500} color="body3">
                  after you press the restart button, the screen device will
                  automatically restart for 20 seconds
                </TextView>
              </Box>

              <Box className="configurationItem-button">
                <Button
                  startIcon={
                    <ClockClockwise weight="bold" size={24} className="icon" />
                  }
                  data-option="restart_tv"
                  onClick={handleConfig}
                >
                  Restart
                </Button>
              </Box>
            </Box>

            <Box className="configurationItem">
              <Box className="configurationItem-icon">
                <Cpu weight="fill" className="icon" size={32} />
              </Box>

              <Box className="configurationItem-content">
                <TextView fontSize="14px" fontWeight={500} color="primary">
                  Camera
                </TextView>
                <TextView fontSize="10px" fontWeight={500} color="body3">
                  after you press the restart button, the addons device will
                  automatically restart for 20 seconds
                </TextView>
              </Box>

              <Box className="configurationItem-button">
                <Button
                  startIcon={
                    <ClockClockwise weight="bold" size={24} className="icon" />
                  }
                  data-option="restart_addon"
                  onClick={handleConfig}
                >
                  Restart
                </Button>
              </Box>
            </Box>

            <Box className="configurationItem">
              <Box className="configurationItem-icon">
                <Cpu weight="fill" className="icon" size={32} />
              </Box>

              <Box className="configurationItem-content">
                <TextView fontSize="14px" fontWeight={500} color="primary">
                  Fix Error
                </TextView>
                <TextView fontSize="10px" fontWeight={500} color="body3">
                  after you press the button, all switch would be fix reset
                </TextView>
              </Box>

              <Box className="configurationItem-button">
                <Button
                  startIcon={
                    <ClockClockwise weight="bold" size={24} className="icon" />
                  }
                  data-option="force_relay"
                  onClick={handleConfig}
                >
                  Fix Relay
                </Button>
              </Box>
            </Box>
          </Box>

          <Box className="header">
            <TextView fontWeight={500} fontSize="1rem" color="body3">
              Other Function
            </TextView>
          </Box>
          <Box className="configuration">
            <Box className="configurationItem">
              <Box className="configurationItem-icon">
                <Cpu weight="fill" className="icon" size={32} />
              </Box>

              <Box className="configurationItem-content">
                <TextView fontSize="14px" fontWeight={500} color="primary">
                  Update Version
                </TextView>
                <TextView fontSize="10px" fontWeight={500} color="body3">
                  after you press the restart button, breaker would be update
                  firmware version
                </TextView>
              </Box>

              <Box className="configurationItem-button">
                <Button
                  startIcon={
                    <ClockClockwise weight="bold" size={24} className="icon" />
                  }
                  data-option="version_update"
                  onClick={handleUpdate}
                >
                  Update
                </Button>
              </Box>
            </Box>
          </Box>
        </StyledModalResetBreakerBody>
      </ModalBody>

      <ModalFoot flex>
        {isLoading && (
          <TextView fontSize="1rem" fontWeight={600}>
            Restarting...
          </TextView>
        )}
        <FlexItem flex={1} />
        <Button
          palette="secondary"
          type="button"
          size="small"
          variant="outline"
          onClick={handleCloseAndReset}
          disabled={isLoading}
        >
          <TextView>Close</TextView>
        </Button>
      </ModalFoot>
    </Modal>
  );
}
