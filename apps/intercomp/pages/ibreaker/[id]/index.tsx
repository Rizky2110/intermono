import { Layout, MapProps, TlatLng } from "components";
import type { NextLayout, GetServerSideProps } from "next";
import {
  Box,
  BreadcrumbsLink,
  BreadcrumbsLinkItem,
  Button,
  Flex,
  FlexItem,
  TextViewLink,
} from "ui/sc";
import { mapDark } from "core/utils";
import styled from "styled-components";
import type { IconProps } from "phosphor-react";
import dynamic from "next/dynamic";
import type { MarkerProps } from "@react-google-maps/api";
import React from "react";
import wrapper from "src/app/store";
import Cookies from "cookies";
import { getOneBreaker, resetBreaker } from "src/app/action";
import { useAppDispatch, useAppSelector } from "src/app/hook";

const StyledBreakerDetail = styled("section")`
  .breaker-detail {
    &Body {
      &DeviceInfo,
      &OtherInfo,
      &Status,
      &Map {
        margin-block-start: 2rem;
      }

      &Status {
        .status {
          margin-block-start: 1rem;
          display: flex;
          flex-direction: column;
          row-gap: 1rem;

          &-item {
            padding: 1rem;
            border-radius: 0.5rem;
            display: flex;
            align-items: center;
            gap: 1rem;

            background: ${(props) => props.theme.colors.error};

            .icon-wrapper {
              background: ${(props) => props.theme.colors.body};
              border-radius: 0.5rem;
            }

            .icon {
              display: block;
              color: ${(props) => props.theme.colors.error};
            }
          }

          &-item.active {
            background: ${(props) => props.theme.colors.success};

            .icon {
              color: ${(props) => props.theme.colors.success};
            }
          }
        }
      }

      &Map {
        display: flex;
        flex-direction: column;

        row-gap: 1rem;

        .breaker-map,
        .breaker-groupList {
          .breaker-header {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            border-bottom: 1px solid ${(props) => props.theme.colors.divider};
            padding: 1rem;
          }

          .breaker-groupDetail,
          .breaker-addressDetail {
            padding: 1rem;
          }
        }

        .breaker-map {
          width: 100%;
          display: flex;
          flex-direction: column;

          .emptyBox {
            min-height: 263px;
            width: 100%;
            background-color: ${(props) => props.theme.colors.primary};
          }

          .breaker-address {
            border: 1px solid ${(props) => props.theme.colors.divider};

            .breaker-addressDetail {
              .detailAddress {
                column-gap: 50px;
                row-gap: 12px;
              }
            }
          }
        }

        .breaker-groupList {
          width: 100%;
          border: 1px solid ${(props) => props.theme.colors.divider};

          .breaker-groupDetail {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }
        }
      }
    }
  }

  @media only screen and (min-width: 768px) {
    .breaker-detail {
      &Body {
        &Status {
          .status {
            flex-direction: row;
            row-gap: 0;
            column-gap: 50px;

            &-item {
              flex: 1;
            }
          }
        }
      }
    }
  }

  @media only screen and (min-width: 1200px) {
    .breaker-detail {
      &Body {
        &Map {
          flex-direction: row;
          row-gap: 0;
          column-gap: 1rem;
          align-items: stretch;

          .breaker-map {
            width: 70%;
          }

          .breaker-groupList {
            width: 30%;
          }
        }
      }
    }
  }

  @media only screen and (min-width: 1440px) {
    .breaker-detail {
      &Body {
        &Map {
          flex-direction: row;
          row-gap: 0;
          column-gap: 1rem;
          align-items: stretch;

          .breaker-map {
            width: 80%;
            flex-direction: row;
          }

          .breaker-groupList {
            width: 20%;
          }
        }
      }
    }
  }

  @media only screen and (min-width: 1440px) {
    .breaker-detail {
      &Body {
        &Map {
          .breaker-map {
            width: 85%;
            flex-direction: row;

            .breaker-address {
              min-width: 493px;
            }
          }

          .breaker-groupList {
            width: 15%;
          }
        }
      }
    }
  }
`;

const Camera = dynamic<IconProps>(() =>
  import("phosphor-react").then((mod) => mod.Camera)
);

const Screencast = dynamic<IconProps>(() =>
  import("phosphor-react").then((mod) => mod.Screencast)
);

const Cpu = dynamic<IconProps>(() =>
  import("phosphor-react").then((mod) => mod.Cpu)
);

const MapPin = dynamic<IconProps>(() =>
  import("phosphor-react").then((mod) => mod.MapPin)
);

const Marker = dynamic<MarkerProps>(() =>
  import("@react-google-maps/api").then((d) => d.Marker)
);

const Map = dynamic<MapProps>(() =>
  import("components").then((mod) => mod.Map)
);

const BreakerDetail: NextLayout = function BreakerDetail() {
  const dispatch = useAppDispatch();
  const { detail, isSuccess, isError } = useAppSelector(
    (state) => state.breaker
  );

  const [mapPosition, setMapPosition] = React.useState<TlatLng | undefined>(
    undefined
  );

  React.useEffect(() => {
    if (isSuccess) {
      dispatch(resetBreaker());
    }
    if (isError) {
      dispatch(resetBreaker());
    }
  }, [isSuccess, isError, dispatch]);

  React.useEffect(() => {
    if (detail?.result.last_root_data?.merchant) {
      setMapPosition({
        lat: detail.result.last_root_data.merchant.lat,
        lng: detail.result.last_root_data.merchant.lng,
      });
    }
  }, [detail]);

  console.log(mapPosition);
  return (
    <StyledBreakerDetail>
      <Box className="breaker-detailHeader">
        <BreadcrumbsLink separator=">" href="/ibreaker">
          <BreadcrumbsLinkItem href="/ibreaker">iBreaker</BreadcrumbsLinkItem>
          <BreadcrumbsLinkItem href={`/ibreaker/${detail?.result.id}`}>
            {detail?.result.unique_identity}
          </BreadcrumbsLinkItem>
        </BreadcrumbsLink>
      </Box>

      <Box className="breaker-detailBody">
        <Box className="breaker-detailBodyDeviceInfo">
          <TextViewLink fontSize="24px" fontWeight={600}>
            Device Info
          </TextViewLink>

          <Flex gap="50px" flexWrap="wrap" marginTop="1rem">
            <FlexItem display="flex" flexDirection="column">
              <TextViewLink fontWeight={500} fontSize="1rem" color="divider">
                Breaker Number
              </TextViewLink>
              <TextViewLink fontSize="20px" fontWeight={500}>
                {detail?.result.unique_identity}
              </TextViewLink>
            </FlexItem>

            <FlexItem display="flex" flexDirection="column">
              <TextViewLink fontWeight={500} fontSize="1rem" color="divider">
                Breaker Name
              </TextViewLink>
              <TextViewLink fontSize="20px" fontWeight={500}>
                {detail?.result.name}
              </TextViewLink>
            </FlexItem>

            <FlexItem display="flex" flexDirection="column">
              <TextViewLink fontWeight={500} fontSize="1rem" color="divider">
                IP Address
              </TextViewLink>
              <TextViewLink fontSize="20px" fontWeight={500}>
                {detail?.result.last_data?.ip || "Unknown"}
              </TextViewLink>
            </FlexItem>

            <FlexItem display="flex" flexDirection="column">
              <TextViewLink fontWeight={500} fontSize="1rem" color="divider">
                Last Active Data
              </TextViewLink>
              <TextViewLink fontSize="20px" fontWeight={500}>
                {/* {DateTime.fromISO(detail?.result.last_data?.datetime || "")
                  .setLocale("en-US")
                  .toFormat("dd LLL yyyy, HH.mm") || "Unknown"} */}
                {detail?.result.last_data?.datetime || "Unknown"}
              </TextViewLink>
            </FlexItem>
          </Flex>
        </Box>

        <Box className="breaker-detailBodyMap">
          <Box className="breaker-map">
            <Map
              zoom={15}
              containerStyle={{
                width: "100%",
                height: "auto",
                minHeight: "263px",
              }}
              options={mapDark}
            >
              {mapPosition && <Marker position={mapPosition} />}
            </Map>
            <Box className="breaker-address">
              <div className="breaker-header">
                <MapPin weight="fill" className="icon" />
                <TextViewLink fontSize="1rem" fontWeight={500}>
                  Address
                </TextViewLink>
              </div>

              <div className="breaker-addressDetail">
                <Flex className="detailAddress" marginBottom="1rem">
                  <FlexItem display="flex" flexDirection="column">
                    <TextViewLink
                      fontWeight={500}
                      fontSize="12px"
                      color="divider"
                    >
                      Latitude
                    </TextViewLink>
                    <TextViewLink fontSize="14px" fontWeight={500}>
                      {detail?.result.last_root_data?.merchant?.lat ||
                        "Unknown"}
                    </TextViewLink>
                  </FlexItem>

                  <FlexItem display="flex" flexDirection="column">
                    <TextViewLink
                      fontWeight={500}
                      fontSize="12px"
                      color="divider"
                    >
                      Merchant
                    </TextViewLink>
                    <TextViewLink fontSize="14px" fontWeight={500}>
                      {detail?.result.last_root_data?.merchant?.name ||
                        "Unknown"}
                    </TextViewLink>
                  </FlexItem>
                </Flex>

                <Flex className="detailAddress" marginBottom="40px">
                  <FlexItem display="flex" flexDirection="column">
                    <TextViewLink
                      fontWeight={500}
                      fontSize="12px"
                      color="divider"
                    >
                      Longitude
                    </TextViewLink>
                    <TextViewLink fontSize="14px" fontWeight={500}>
                      {detail?.result.last_root_data?.merchant?.lng ||
                        "Unknown"}
                    </TextViewLink>
                  </FlexItem>

                  <FlexItem display="flex" flexDirection="column">
                    <TextViewLink
                      fontWeight={500}
                      fontSize="12px"
                      color="divider"
                    >
                      Location
                    </TextViewLink>
                    <TextViewLink fontSize="14px" fontWeight={500}>
                      {detail?.result.last_root_data?.merchant?.address ||
                        "Unknown"}
                    </TextViewLink>
                  </FlexItem>
                </Flex>

                <Button variant="outline" palette="secondary">
                  View Maps
                </Button>
              </div>
            </Box>
          </Box>

          <Box className="breaker-groupList">
            <div className="breaker-header">
              <MapPin weight="fill" className="icon" />
              <TextViewLink fontSize="1rem" fontWeight={500}>
                Group List
              </TextViewLink>
            </div>

            <div className="breaker-groupDetail">
              {detail?.result.groups?.map((group, idx) => (
                <TextViewLink key={group.id} fontSize="1rem" fontWeight={500}>
                  {idx}. {group.name}
                </TextViewLink>
              ))}

              {detail?.result.groups !== undefined ? (
                <Button
                  className="btn-detail"
                  fullWidth
                  variant="outline"
                  palette="secondary"
                >
                  Detail
                </Button>
              ) : (
                <TextViewLink fontSize="1rem" fontWeight={500}>
                  No Group.
                </TextViewLink>
              )}
            </div>
          </Box>
        </Box>
        <Box className="breaker-detailBodyOtherInfo">
          <TextViewLink fontSize="24px" fontWeight={600}>
            Other Info
          </TextViewLink>

          <Flex gap="50px" flexWrap="wrap" marginTop="1rem">
            <FlexItem display="flex" flexDirection="column">
              <TextViewLink fontWeight={500} fontSize="1rem" color="divider">
                Firmware Version
              </TextViewLink>
              <TextViewLink fontSize="20px" fontWeight={500}>
                {detail?.result.last_data?.firmware_version || "Unknown"}
              </TextViewLink>
            </FlexItem>

            <FlexItem display="flex" flexDirection="column">
              <TextViewLink fontWeight={500} fontSize="1rem" color="divider">
                Schedule Key
              </TextViewLink>
              <TextViewLink fontSize="20px" fontWeight={500}>
                {detail?.result.last_data?.schedule || "Unknown"}
              </TextViewLink>
            </FlexItem>

            <FlexItem display="flex" flexDirection="column">
              <TextViewLink fontWeight={500} fontSize="1rem" color="divider">
                Start On
              </TextViewLink>
              <TextViewLink fontSize="20px" fontWeight={500}>
                {detail?.result.last_data?.start_on || "Unknown"}
              </TextViewLink>
            </FlexItem>

            <FlexItem display="flex" flexDirection="column">
              <TextViewLink fontWeight={500} fontSize="1rem" color="divider">
                Last Update Server
              </TextViewLink>
              <TextViewLink fontSize="20px" fontWeight={500}>
                {detail?.result.last_data?.update_schedule_on || "Unknown"}
              </TextViewLink>
            </FlexItem>
          </Flex>
        </Box>

        <Box className="breaker-detailBodyStatus">
          <TextViewLink fontSize="24px" fontWeight={600}>
            Current Status
          </TextViewLink>

          <div className="status">
            <div
              className={`status-item ${
                detail?.result.last_data?.status?.modem ? "active" : ""
              }`}
            >
              <span className="icon-wrapper">
                <Cpu size={60} weight="fill" className="icon" />
              </span>

              <TextViewLink color="body" fontSize="24px" fontWeight={600}>
                Modem
              </TextViewLink>
            </div>

            <div
              className={`status-item ${
                detail?.result.last_data?.status?.tv ? "active" : ""
              }`}
            >
              <span className="icon-wrapper">
                <Screencast size={60} weight="fill" className="icon" />
              </span>

              <TextViewLink color="body" fontSize="24px" fontWeight={600}>
                Screen
              </TextViewLink>
            </div>

            <div
              className={`status-item ${
                detail?.result.last_data?.status?.addon ? "active" : ""
              }`}
            >
              <span className="icon-wrapper">
                <Camera size={60} weight="fill" className="icon" />
              </span>

              <TextViewLink color="body" fontSize="24px" fontWeight={600}>
                Camera
              </TextViewLink>
            </div>
          </div>
        </Box>
      </Box>
    </StyledBreakerDetail>
  );
};

export default BreakerDetail;

BreakerDetail.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout title="iBreaker">{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (ctx) => {
    const { req, res, params } = ctx;

    const cookies = new Cookies(req, res);

    const accessToken = cookies.get("access") || "";

    await store.dispatch(
      getOneBreaker({
        cookie: `access=${accessToken};`,
        datas: {
          id: (params?.id as string) || "",
        },
      })
    );

    return {
      props: {},
    };
  });
