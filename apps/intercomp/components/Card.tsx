import Image from "next/image";
import React from "react";
import styled, { DefaultTheme } from "styled-components";
import { Box, BoxLink, ButtonLink } from "ui/sc";

export type CardBanner = {
  palette: "primary" | "secondary" | "success" | "info" | "error" | "light";
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
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .text-numberDevice {
      max-width: 10rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &Body {
      display: flex;
      flex-direction: column;

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
            src="/assets/image/board-128x128-navy.png"
          />
        </Box>
      </BoxLink>
    </StyledCardBanner>
  );
};
