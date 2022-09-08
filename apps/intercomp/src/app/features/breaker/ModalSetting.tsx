import {
  Box,
  Button,
  Checkbox,
  Flex,
  FlexItem,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalFoot,
  ModalHead,
  TextView,
  ToastKind,
  useToast,
} from "ui/sc";
import type { IconProps } from "phosphor-react";
import { convertHouseInSecond } from "core/utils";
import dynamic from "next/dynamic";
import styled from "styled-components";
import type { BaseModalProps } from "src/lib/constants";
import React, { useId } from "react";
import {
  BodySettingKind,
  bodySettingReducer,
  INITIAL_BODY_SETTING,
} from "./reducer";
import { useAppDispatch, useAppSelector } from "src/app/hook";
import { resetBreaker, updateSettingBreaker } from "./breakerSlice";

export type ModalSettingProps = BaseModalProps & {
  id: number;
};

const StyledModalSettingBody = styled("div")`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;

  .setting {
    display: flex;
    flex-direction: column;
    row-gap: 4rem;

    .custom-input {
      .label {
        font-size: 12px;
        font-weight: 500;
      }

      .container {
        padding: 0.25rem;
        border: 1px solid ${(props) => props.theme.colors.body2};
      }

      .icon {
        color: ${(props) => props.theme.colors.body3};
      }
    }

    &Item {
      display: flex;
      flex-direction: column;
      row-gap: 1.5rem;

      &-left {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      &-right {
        display: flex;
        flex-direction: column;
        row-gap: 0.5rem;

        &Label {
          min-width: 88px;
        }
      }
    }
  }

  @media only screen and (min-width: 768px) {
    .setting {
      &Item {
        flex-direction: row;
        align-items: center;
        row-gap: 0;
        column-gap: 1rem;

        &-left {
          flex: 1;
        }

        &-right {
          flex-direction: row;
          align-items: center;
          min-width: 350px;
          row-gap: 0;

          .custom-input {
            .container {
              width: 110px;

              input {
                width: 100%;
              }
            }
          }

          &Container {
            width: 100%;
            display: flex;
            flex-direction: column;

            .custom-input {
              .container {
                width: 200px;
              }
            }
          }
        }
      }

      &Item.ssid {
        align-items: stretch;
      }
    }
  }
`;

const X = dynamic<IconProps>(() =>
  import("phosphor-react").then((mod) => mod.X)
);

export default function ModalForceSchedule({
  isOpen,
  handleClose,
  id,
}: ModalSettingProps): JSX.Element {
  const formId = useId();
  const { dispatchToast } = useToast();

  const dispatch = useAppDispatch();
  const { isSuccess, isError, isLoading } = useAppSelector(
    (state) => state.breaker
  );

  const [bodyState, dispatchBody] = React.useReducer(
    bodySettingReducer,
    INITIAL_BODY_SETTING
  );

  React.useEffect(() => {
    if (!isOpen) return;

    if (isSuccess) {
      dispatchToast({
        type: ToastKind.Add,
        payload: {
          type: "success",
          title: "Success Update Setting",
          description: `Success for update setting on breaker ${id}`,
          id: Math.random(),
        },
      });
      dispatch(resetBreaker());
    }

    if (isError) {
      dispatchToast({
        type: ToastKind.Add,
        payload: {
          type: "error",
          title: "Error Update Setting",
          description: `Failed to update setting on breaker ${id}`,
          id: Math.random(),
        },
      });
      dispatch(resetBreaker());
    }
  }, [isOpen, isSuccess, isError, dispatch, dispatchToast, id]);

  const handleCloseAndReset = () => {
    handleClose();
  };

  const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isNaN(+bodyState.interval)) {
      dispatchToast({
        type: ToastKind.Add,
        payload: {
          type: "error",
          title: "Not Acceptable Value",
          description: "Interval value must be an integer",
          id: Math.random(),
        },
      });

      return;
    }

    dispatch(
      updateSettingBreaker({
        datas: {
          id,
          body: {
            breaker_connection: bodyState.connection,
            breaker_interval: bodyState.interval,
            breaker_restart: convertHouseInSecond(
              bodyState.restartTime
            ).toString(),
            breaker_version: bodyState.version,
            breaker_wifi_password: bodyState.password,
            breaker_wifi_ssid: bodyState.ssid,
          },
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
      round
    >
      <ModalHead flex>
        <TextView flex={1} color="white">
          iBreaker Setting
        </TextView>
        <IconButton palette="error" onClick={handleCloseAndReset}>
          <X />
        </IconButton>
      </ModalHead>

      <ModalBody>
        <StyledModalSettingBody>
          <form className="setting" id={formId} onSubmit={handleSubmit}>
            <Box className="settingItem">
              <Box className="settingItem-left">
                <TextView fontWeight={600} fontSize="1rem" color="primary">
                  Interval Time
                </TextView>
                <TextView fontWeight={400} fontSize="14px" color="body3">
                  How often does the breaker send requests to the system
                </TextView>
              </Box>

              <Box className="settingItem-right">
                <Box className="settingItem-rightLabel">
                  <TextView fontWeight={600} fontSize="1rem" color="primary">
                    Every
                  </TextView>
                </Box>

                <Flex alignItems="center" gap="0.5rem">
                  <Input
                    className="settingItem-input"
                    palette="primary"
                    variant="plain"
                    type="text"
                    value={bodyState.interval}
                    onChange={(evt) =>
                      dispatchBody({
                        type: BodySettingKind.Interval,
                        payload: evt.target.value,
                      })
                    }
                  />
                  <TextView fontWeight={400} fontSize="1rem" color="primary">
                    Second
                  </TextView>
                </Flex>
              </Box>
            </Box>

            <Box className="settingItem">
              <Box className="settingItem-left">
                <TextView fontWeight={600} fontSize="1rem" color="primary">
                  Restart Time
                </TextView>
                <TextView fontWeight={400} fontSize="14px" color="body3">
                  Set the clock for the breaker to restart the device
                </TextView>
              </Box>

              <Box className="settingItem-right">
                <Box className="settingItem-rightLabel">
                  <TextView fontWeight={600} fontSize="1rem" color="primary">
                    Every
                  </TextView>
                </Box>

                <Input
                  className="settingItem-input"
                  palette="primary"
                  variant="plain"
                  type="time"
                  value={bodyState.restartTime}
                  onChange={(evt) =>
                    dispatchBody({
                      type: BodySettingKind.RestartTime,
                      payload: evt.target.value,
                    })
                  }
                />
              </Box>
            </Box>

            <Box className="settingItem">
              <Box className="settingItem-left">
                <TextView fontWeight={600} fontSize="1rem" color="primary">
                  Connection
                </TextView>
                <TextView fontWeight={400} fontSize="14px" color="body3">
                  Set connection for the breaker to connect the device
                </TextView>
              </Box>

              <Box className="settingItem-right radio">
                <Flex alignItems="center" gap="0.5rem" style={{ width: 120 }}>
                  <Checkbox
                    size="small"
                    palette="primary"
                    round
                    data-role="checkbox"
                    checked={bodyState.connection === "lan"}
                    value="lan"
                    onChange={() =>
                      dispatchBody({
                        type: BodySettingKind.Connection,
                        payload: "lan",
                      })
                    }
                  />

                  <TextView fontWeight={500} fontSize="1rem" color="primary">
                    LAN
                  </TextView>
                </Flex>

                <Flex alignItems="center" gap="0.5rem">
                  <Checkbox
                    size="small"
                    palette="primary"
                    round
                    data-role="checkbox"
                    checked={bodyState.connection === "wifi"}
                    value="wifi"
                    onChange={() =>
                      dispatchBody({
                        type: BodySettingKind.Connection,
                        payload: "wifi",
                      })
                    }
                  />

                  <TextView fontWeight={500} fontSize="1rem" color="primary">
                    WIFI
                  </TextView>
                </Flex>
              </Box>
            </Box>

            <Box className="settingItem ssid">
              <Box className="settingItem-left">
                <TextView fontWeight={600} fontSize="1rem" color="primary">
                  SSID & Password
                </TextView>
                <TextView fontWeight={400} fontSize="14px" color="body3">
                  Set SSID and Password to connect to wifi
                </TextView>
              </Box>

              <Box className="settingItem-right">
                <Box className="settingItem-rightContainer">
                  <Flex alignItems="center">
                    <Box className="settingItem-rightLabel">
                      <TextView
                        fontWeight={600}
                        fontSize="1rem"
                        color="primary"
                      >
                        SSID
                      </TextView>
                    </Box>

                    <Input
                      className="settingItem-input"
                      palette="primary"
                      variant="plain"
                      type="text"
                      value={bodyState.ssid}
                      onChange={(evt) =>
                        dispatchBody({
                          type: BodySettingKind.SSID,
                          payload: evt.target.value,
                        })
                      }
                      name="ssid"
                    />
                  </Flex>

                  <Flex alignItems="center">
                    <Box className="settingItem-rightLabel">
                      <TextView
                        fontWeight={600}
                        fontSize="1rem"
                        color="primary"
                      >
                        Password
                      </TextView>
                    </Box>

                    <Input
                      className="settingItem-input"
                      palette="primary"
                      variant="plain"
                      type="password"
                      name="ssidPassword"
                      value={bodyState.password}
                      onChange={(evt) =>
                        dispatchBody({
                          type: BodySettingKind.Password,
                          payload: evt.target.value,
                        })
                      }
                    />
                  </Flex>
                </Box>
              </Box>
            </Box>

            <Box className="settingItem">
              <Box className="settingItem-left">
                <TextView fontWeight={600} fontSize="1rem" color="primary">
                  Version
                </TextView>
                <TextView fontWeight={400} fontSize="14px" color="body3">
                  The version used to be update firmware
                </TextView>
              </Box>

              <Box className="settingItem-right">
                <Box className="settingItem-rightLabel">
                  <TextView fontWeight={600} fontSize="1rem" color="primary">
                    Version
                  </TextView>
                </Box>

                <Input
                  className="settingItem-input"
                  palette="primary"
                  variant="plain"
                  type="text"
                  value={bodyState.version}
                  onChange={(evt) =>
                    dispatchBody({
                      type: BodySettingKind.Version,
                      payload: evt.target.value,
                    })
                  }
                />
              </Box>
            </Box>
          </form>
        </StyledModalSettingBody>
      </ModalBody>
      <ModalFoot flex>
        <FlexItem flex={1} />
        <Button
          palette="secondary"
          type="button"
          size="small"
          variant="outline"
          onClick={handleCloseAndReset}
        >
          <TextView>Close</TextView>
        </Button>

        <Button
          palette="secondary"
          type="submit"
          size="small"
          variant="contain"
          form={formId}
        >
          <TextView>Save</TextView>
        </Button>
      </ModalFoot>
    </Modal>
  );
}
