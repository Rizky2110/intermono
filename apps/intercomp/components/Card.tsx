import Image from "next/image";
import React from "react";
import styled from "styled-components";
import { Box, BoxLink, ButtonLink } from "ui/sc";

export type CardBanner = {
  palette:
    | "primary"
    | "secondary"
    | "success"
    | "info"
    | "error"
    | "light"
    | "warning";
  totalDevice: number;
  title: string;
  description: string;
  href: string;
  buttonTitle: string;
};

const StyledCardBanner = styled("div")<Pick<CardBanner, "palette">>`
  .card-banner {
    position: relative;
    background-color: ${(props) => props.theme.palette[props.palette].default};
    color: ${(props) => props.theme.palette[props.palette].opposite};
    padding-inline: 1rem;
    padding-block: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .text.text-numberDevice {
      max-width: 10rem;
      min-width: 10rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &Body {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 100%;
      z-index: 10;

      .text-titleBody {
        margin-block-end: 0.5rem;
      }
    }

    &Btn {
      background-color: ${(props) => props.theme.colors.body};
      color: ${(props) => props.theme.palette[props.palette].default};
      font-weight: 600;
    }

    &Image {
      position: absolute;
      width: fit-content;
      height: fit-content;
      top: 0;
      right: 0;
      transform: translate(0.5rem, -1.5rem);
      z-index: 100;
    }
  }

  @media only screen and (min-width: 768px) {
    .card-banner {
      flex-direction: row;
      align-items: center;
      gap: 2rem;

      .text-numberDevice {
        max-width: 15rem;
        margin-block-end: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      &Body {
        z-index: 1000;
        width: fit-content;
        margin-inline-end: auto;

        .text-descriptionBody {
          max-width: 30ch;
          margin-block-end: 0;
        }
      }

      &Image {
        transform: translate(-9rem, 4rem);
      }
    }
  }

  @media only screen and (min-width: 1280px) {
    .card-banner {
      padding-inline: 2rem;
      .text.text-numberDevice {
        max-width: 10rem;
      }

      &Body {
        z-index: 0;
        margin-inline-end: 0;

        .text-descriptionBody {
          max-width: 50ch;
          margin-block-end: 0;
        }
      }

      &Image {
        transform: translate(-1rem, 0rem);
      }
    }
  }

  @media only screen and (min-width: 1980px) {
    .card-banner {
      .text.text-numberDevice {
        max-width: 15rem;
      }

      &Body {
        z-index: 0;
        margin-inline-end: 0;

        .text-descriptionBody {
          max-width: 70ch;
          margin-block-end: 0;
        }
      }

      &Image {
        transform: translate(-1rem, 0rem);
      }
    }
  }
`;
export const CardBanner: React.FC<CardBanner> = function CardBanner({
  palette,
  totalDevice,
  title,
  description,
  buttonTitle,
  href,
}: CardBanner) {
  return (
    <StyledCardBanner palette={palette}>
      <BoxLink href={href} className="card-banner">
        <h1 className="text text-numberDevice">{totalDevice}</h1>
        <Box className="card-bannerBody">
          <h3 className="text text-titleBody">{title}</h3>
          <p className="text text-descriptionBody">{description}</p>
        </Box>

        <ButtonLink href={href} className="card-bannerBtn">
          {buttonTitle}
        </ButtonLink>

        <Box className="card-bannerImage">
          <Image
            width={150}
            height={132}
            alt=""
            src={
              palette === "primary"
                ? "/assets/image/board-128x128-navy.png"
                : palette === "success"
                ? "/assets/image/board-128x128-green.png"
                : palette === "warning"
                ? "/assets/image/board-128x128-yellow.png"
                : palette === "info"
                ? "/assets/image/board-128x128-navy.png"
                : "/assets/image/board-128x128-red.png"
            }
          />
        </Box>
      </BoxLink>
    </StyledCardBanner>
  );
};

export type CardStatusProps = {
  palette:
    | "primary"
    | "secondary"
    | "success"
    | "info"
    | "error"
    | "light"
    | "warning";
  totalDevice: number;
  title: string;
  description: string;
  href: string;
  buttonTitle: string;
};

const StyledCardStatus = styled("div")<Pick<CardStatusProps, "palette">>`
  --image-size: 120px;
  --card-statusWidth: 364px;

  border: 1px solid #eeeeee;

  width: min(100%, var(--card-statusWidth));
  .text {
    text-align: center;
  }

  .card-statusHeader {
    position: relative;
    background-color: ${(props) => props.theme.palette[props.palette].default};
    height: 120px;
    width: 100%;

    &Image {
      position: absolute;
      bottom: 0;
      left: calc(50% - (var(--image-size) / 2));
      z-index: 10;
      transform: translate(0, 50%);

      .image {
        position: relative;
        width: var(--image-size);
        height: 93px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  .card-statusBody {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: calc(100% - 4rem);
    margin-inline: auto;
    height: calc(580px - var(--image-size));

    .text-body {
      &Title {
        font-weight: 600;
        margin-block-end: 0.4rem;
      }

      &Description {
        color: ${(props) => props.theme.colors.divider};
        font-size: 1.2rem;
        margin-block-end: 50px;
      }

      &Device {
        color: ${(props) => props.theme.palette[props.palette].default};
        font-size: 64px;
        font-weight: 400;
      }
    }

    .btn-body {
      &Detail {
        background-color: ${(props) => props.theme.colors.body2};
        color: ${(props) => props.theme.colors.primary};
        font-weight: 600;
      }
    }
  }
`;

export const CardStatus: React.FC<CardStatusProps> = function CardStatus({
  palette,
  totalDevice,
  title,
  description,
  href,
  buttonTitle,
}: CardStatusProps) {
  return (
    <StyledCardStatus palette={palette}>
      <Box className="card-statusHeader">
        <Box className="card-statusHeaderImage">
          <span className="image">
            <Image
              layout="fill"
              alt=""
              src={
                palette === "primary"
                  ? "/assets/image/board-128x128-navy.png"
                  : palette === "success"
                  ? "/assets/image/board-128x128-green.png"
                  : palette === "warning"
                  ? "/assets/image/board-128x128-yellow.png"
                  : "/assets/image/board-128x128-red.png"
              }
            />
          </span>
        </Box>
      </Box>

      <Box className="card-statusBody">
        <h3 className="text text-bodyTitle">{title}</h3>

        <p className="text text-bodyDescription">{description}</p>

        <h2 className="text text-bodyDevice">{totalDevice}</h2>

        <ButtonLink href={href} fullWidth className="btn btn-bodyDetail">
          {buttonTitle}
        </ButtonLink>
      </Box>
    </StyledCardStatus>
  );
};
