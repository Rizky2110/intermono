import React from "react";
import styled from "styled-components";
import dynamic from "next/dynamic";
import { IconProps } from "phosphor-react";
import Image from "next/image";
import { hexToHsl, hexToRgba } from "core";
import Link from "next/link";

import menuNavigationList from "src/lib/navigation";
import { Url } from "url";
import { useRouter } from "next/router";
import { useNavbar } from "src/app/contexts/NavbarContext";

const StyledNavbar = styled("nav")`
  position: relative;
  box-shadow: 0px 3px 6px -1px ${(props) => hexToRgba(props.theme.colors.primary, 0.55)};

  .nav {
    width: calc(100% - 2rem);
    margin-inline: auto;
    display: flex;
    align-items: center;
    padding-block: 1rem;

    .text {
      line-height: 1.5;
      color: ${(props) => props.theme.colors.primary};
      margin-block-end: 0;
    }

    .btn {
      border: 0;
      padding: 0;
      margin: 0;
      font-family: inherit;
      font-size: 1rem;
      cursor: pointer;
    }

    &-title {
      flex: 1;

      .text-navTitle {
        font-size: 1.5rem;
      }
    }

    &-navbar {
      .btn-icon {
        background: transparent;

        width: 2rem;
        height: 2rem;
        font-size: 1.5rem;
      }
    }

    &-navbarMenu.close {
      display: none;
    }

    &-navbarMenu {
      background: ${(props) => props.theme.colors.primary};
      position: absolute;
      left: 0;
      top: 100%;
      z-index: 1001;
      width: 100%;

      display: grid;
      grid-template-rows: repeat(3, auto);

      .btn-userProfile,
      .btn-icon {
        background: transparent;

        width: 100%;
        height: fit-content;
        font-size: 1rem;

        padding-block: 1.5rem;
        padding-inline: 1rem;
        display: flex;
        align-items: center;
        gap: 1rem;

        transition: all 0.25s ease-in-out;

        .notif-count {
          background: ${(props) => props.theme.colors.secondary};
          padding-inline: 1rem;
          border-radius: 1rem;
          color: ${(props) => props.theme.colors.body};
        }

        .text-buttonIcon {
          color: ${(props) => props.theme.colors.body};
        }

        &:hover {
          background: ${(props) => hexToHsl(props.theme.colors.primary, 5)};
        }
      }

      .btn-userProfile {
        .image {
          width: 2rem;
          height: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          overflow: hidden;
        }

        .text-userProfile {
          color: ${(props) => props.theme.colors.body};
        }
      }

      .btn-icon .icon {
        color: ${(props) => props.theme.colors.body};
        font-size: 2rem;
      }
    }
  }

  @media only screen and (min-width: 768px) {
    .nav {
      &-navbar {
        .btn-expand {
          display: none;
        }
      }

      &-navbarMenu.close,
      &-navbarMenu {
        position: relative;
        display: grid;
        background: transparent;
        grid-template-columns: repeat(3, auto);
        grid-template-rows: auto;
        gap: 1rem;

        .btn-userProfile,
        .btn-icon {
          padding-block: 0;
          padding-inline: 0;
          color: ${(props) => props.theme.colors.primary};
          .text-buttonIcon {
            display: none;
          }
          .notif-count {
            display: none;
          }

          &:hover {
            background: transparent;
          }
        }

        .btn-userProfile {
          padding-inline: 2rem;
          border-inline: 1px solid ${(props) => props.theme.colors.divider};
          .text-userProfile {
            color: ${(props) => props.theme.colors.primary};
            font-weight: 600;
          }
        }

        .btn-icon .icon {
          color: ${(props) => props.theme.colors.primary};
          font-size: 2rem;
        }
      }
    }
  }
`;

const DotsThreeOutlineVertical = dynamic<IconProps>(() =>
  import("phosphor-react").then((mod) => mod.DotsThreeOutlineVertical)
);

const Bell = dynamic<IconProps>(() =>
  import("phosphor-react").then((mod) => mod.Bell)
);

const SignOut = dynamic<IconProps>(() =>
  import("phosphor-react").then((mod) => mod.SignOut)
);

export type NavbarProps = {
  titleNav: string;
};

export const Navbar: React.FC<NavbarProps> = ({ titleNav }: NavbarProps) => {
  const [expandMenu, setExpandMenu] = React.useState(false);

  const { setIsOpen } = useNavbar();

  const handleExpandMenu = () => {
    setIsOpen(false);
    setExpandMenu((prev) => !prev);
  };

  return (
    <StyledNavbar>
      <div className="nav">
        <div className="nav-title">
          <h1 className="text text-navTitle">{titleNav}</h1>
        </div>

        <div className="nav-navbar">
          <button
            onClick={handleExpandMenu}
            type="button"
            className="btn btn-icon btn-expand"
          >
            <DotsThreeOutlineVertical className="icon" weight="fill" />
          </button>

          <div className={`nav-navbarMenu ${expandMenu ? "" : "close"}`}>
            <button type="button" className="btn btn-icon">
              <Bell className="icon" weight="fill" />
              <span className="text text-buttonIcon">Notification</span>{" "}
              <span className="notif-count">30</span>
            </button>
            <button className="btn btn-userProfile">
              <div className="image">
                <Image
                  width={32}
                  height={32}
                  src="/assets/image/file-text.jpg"
                  alt="user profile"
                />
              </div>
              <span className="text text-userProfile">Sebastian Wijaya</span>
            </button>
            <button type="button" className="btn btn-icon">
              <SignOut className="icon" weight="fill" />
              <span className="text text-buttonIcon">Sign Out</span>{" "}
            </button>
          </div>
        </div>
      </div>
    </StyledNavbar>
  );
};

type StyledSidebarProps = {
  open: boolean;
};

const StyledSidebar = styled("aside")<StyledSidebarProps>`
  --sidebar-width: 350px;

  ${(props) => !props.open && "transform: translateX(-100%);"}

  position: fixed;
  background: ${(props) => props.theme.colors.primary};
  z-index: 10000;
  min-height: 100vh;
  width: min(100% - 2rem, var(--sidebar-width));
  transition: all 0.5s ease;

  .aside {
    width: 100%;
    padding-block: 1rem;

    .text {
      margin-block-end: 0;
      white-space: nowrap;
      opacity: ${(props) => (props.open ? 1 : 0)};
      transition: all 0.25s linear;
    }

    .image {
      min-width: 70px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    li {
      height: 50px;
      list-style: none;
      display: flex;
      align-items: center;
      margin-block-start: 10px;

      a.active {
        &::after {
          position: absolute;
          content: "";
          inset: 0;
          width: 4px;
          background-color: ${(props) => props.theme.colors.secondary};
          color: #fff;
          z-index: 100;
        }

        &::before {
          position: absolute;
          content: "";
          width: 100%;
          inset: 0;
          background: ${(props) => props.theme.colors.body};
          background: linear-gradient(
            90deg,
            ${(props) => hexToRgba(props.theme.colors.body, 0.1)} 0%,
            ${(props) => hexToRgba(props.theme.colors.primary, 0.5)} 77%
          );
          color: #fff;
          z-index: 10;
        }
      }

      a {
        position: relative;
        list-style: none;
        background-color: transparent;
        display: flex;
        align-items: center;
        height: 100%;
        width: 100%;
        border-radius: 4px;
        text-decoration: none;
        transition: all 0.3s ease;
        color: ${(props) => props.theme.colors.body};

        .icon {
          min-width: 70px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        &:hover::after {
          position: absolute;
          content: "";
          inset: 0;
          width: 4px;
          background-color: ${(props) => props.theme.colors.secondary};
          color: #fff;
          z-index: 100;
        }

        &:hover::before {
          position: absolute;
          content: "";
          width: 100%;
          inset: 0;
          background: ${(props) => props.theme.colors.body};
          background: linear-gradient(
            90deg,
            ${(props) => hexToRgba(props.theme.colors.body, 0.1)} 0%,
            ${(props) => hexToRgba(props.theme.colors.primary, 0.5)} 77%
          );
          color: #fff;
          z-index: 10;
        }
      }

      .btn-nav {
        position: relative;
        background-color: transparent;
        color: ${(props) => props.theme.colors.body};
        width: 100%;
        height: 100%;
        border: none;
        outline: none;
        padding: 0;
        display: flex;
        align-items: center;
        border-radius: 4px;
        transition: all 0.3s ease;
        font-family: inherit;
        font-size: 1rem;

        .icon {
          min-width: 70px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .text-nav {
          margin-inline-end: auto;
        }

        &:hover::after {
          position: absolute;
          content: "";
          inset: 0;
          width: 4px;
          background-color: ${(props) => props.theme.colors.secondary};
          color: #fff;
          z-index: 100;
        }

        &:hover::before {
          position: absolute;
          content: "";
          width: 100%;
          inset: 0;
          background: ${(props) => props.theme.colors.body};
          background: linear-gradient(
            90deg,
            ${(props) => hexToRgba(props.theme.colors.body, 0.1)} 0%,
            ${(props) => hexToRgba(props.theme.colors.primary, 0.5)} 77%
          );
          color: #fff;
          z-index: 10;
        }
      }
    }

    header.image-text {
      display: flex;
      align-items: center;
      padding-block-start: 1rem;
      padding-block-end: 2rem;
      border-block-end: 2px solid
        ${(props) => hexToHsl(props.theme.colors.primary, 5)};
      overflow: hidden;

      .text-headerTitle {
        color: ${(props) => props.theme.colors.body};
        font-size: 1.5rem;
      }
    }

    .menu-bar {
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow-y: auto;
      overflow-x: hidden;
      scrollbar-width: none;
      overscroll-behavior: contain;
      margin-block-start: 2rem;

      .menu {
        flex: 1;

        .menu-links {
          padding: 0;
          margin: 0;
        }
      }
    }
  }

  .btn.btn-expand {
    width: ${(props) => (props.open ? "2rem" : "4rem")};
    height: 2rem;
    position: absolute;
    right: 0;
    top: 0;
    transform: translate(${(props) => (props.open ? "1rem" : "2rem")}, 5.3rem);
    z-index: 101;
    color: ${(props) => props.theme.colors.primary};
    background-color: ${(props) => hexToHsl(props.theme.colors.primary, 5)};
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0;
    margin: 0;
    font-size: 2rem;
    border: none;
    outline: none;
    border-radius: 1rem;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.2s linear 0.5s;

    .icon {
      transform: rotate(${(props) => (props.open ? "180deg" : "0deg")});
      display: block;
      font-size: 2rem;
      transition: all 0.8s ease;
      color: ${(props) => props.theme.colors.body};
    }
  }

  @media only screen and (min-width: 800px) {
    --sidebar-width: ${(props) => (props.open ? "210px" : "70px")};
    transform: translateX(0);

    .btn.btn-expand {
      width: 2rem;
      border-radius: 50%;
      transform: translate(1rem, 5.3rem);
    }
  }

  @media only screen and (min-width: 1200px) {
    --sidebar-width: ${(props) => (props.open ? "250px" : "70px")};
  }

  @media only screen and (min-width: 1900px) {
    --sidebar-width: ${(props) => (props.open ? "322px" : "70px")};
  }
`;

const CaretCircleRight = dynamic<IconProps>(() =>
  import("phosphor-react").then((mod) => mod.CaretCircleRight)
);

export const SideBar: React.FC = () => {
  const router = useRouter();
  const { isOpen, setIsOpen } = useNavbar();

  return (
    <StyledSidebar open={isOpen}>
      <div className="aside">
        <header className="image-text">
          <span className="image">
            <Image
              width={32}
              height={32}
              src="/icons/icon-192x192.png"
              alt=""
            />
          </span>
          <h1 className="text text-headerTitle">Intercomp</h1>
        </header>

        <div className="menu-bar">
          <div className="menu">
            <ul className="menu-links">
              {menuNavigationList.map((menu) => {
                if (menu.title.toLowerCase() === "setting") {
                  return (
                    <li key={menu.title} className="nav-link">
                      <button className="btn-nav" type="button">
                        {menu.icon}
                        <span className="text text-nav">{menu.title}</span>
                        {menu.extraIcon}
                      </button>
                    </li>
                  );
                }
                return (
                  <li key={menu.title} className="nav-link">
                    <Link href={menu.to as unknown as Url}>
                      <a
                        className={router.pathname === menu.to ? "active" : ""}
                      >
                        {menu.icon}
                        <span className="text text-nav">{menu.title}</span>
                      </a>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="btn btn-expand"
      >
        <CaretCircleRight className="icon" size={32} />
      </button>
    </StyledSidebar>
  );
};
