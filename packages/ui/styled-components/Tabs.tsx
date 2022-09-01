import { hexToHsl } from "core";
import dynamic from "next/dynamic";
import { IconProps } from "phosphor-react";
import React from "react";
import styled, { DefaultTheme } from "styled-components";

import { StandardProps } from "./system";

export interface TabProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, "children"> {
  index: number | string;
  label?: number | string | React.ReactNode;
}

export interface TabsProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, "children"> {
  palette?: keyof Pick<DefaultTheme, "colors">["colors"];
  paletteActive?: keyof Pick<DefaultTheme, "colors">["colors"];
  activeTab: number | string;
  onChangeTab: (tabIndex: number | string) => void;
}

export type TabButtonProps = Array<{
  index: number | string;
  label?: number | string | React.ReactNode;
}>;

export interface TabButtonsProps
  extends StandardProps<React.HTMLAttributes<HTMLButtonElement>, "children"> {
  buttons: TabButtonProps;
  activeTab: number | string;
  changeTab: (tabIndex: number | string) => void;
}

interface ComponentProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, "children"> {
  palette?: keyof Pick<DefaultTheme, "colors">["colors"];
  paletteActive?: keyof Pick<DefaultTheme, "colors">["colors"];
  activeTab: number | string;
}

const StyledTabs = styled("div")<ComponentProps>`
  .tab-buttons {
    scroll-behavior: smooth;
    display: flex;
    overflow-x: auto;
    background-color: ${(props) => {
      const { palette, theme } = props;
      return theme.palette[palette || "primary"].default;
    }};
    ::-webkit-scrollbar {
      width: 0.06125rem;
      height: 0.06125rem;
    }
    ::-webkit-scrollbar-track {
      background: transparent;
    }
    ::-webkit-scrollbar-thumb {
      background: ${(props) => props.theme.colors.secondary};
    }
    ::-webkit-scrollbar-thumb:hover {
      background: ${(props) => hexToHsl(props.theme.colors.secondary, 10)};
    }
  }
  .tab-button {
    color: ${(props) => {
      const { paletteActive, theme } = props;
      return theme.palette[paletteActive || "primary"].opposite;
    }};
    border-bottom: 0.25rem solid transparent;
  }
  .tab-button.active,
  .active {
    border-bottom: 0.25rem solid
      ${(props) => {
        const { paletteActive, theme } = props;
        return theme.palette[paletteActive || "secondary"].default;
      }};
    color: ${(props) => {
      const { paletteActive, theme } = props;
      return theme.palette[paletteActive || "secondary"].default;
    }};
  }
`;
const CustomButton = styled.button`
  font-size: ${({ theme }) => theme.typography.size.sub1};
  background: transparent;
  border: none;
  outline: none;
  padding: 0.875rem 1.25rem;
  cursor: pointer;
  transition: all ease-in-out 0.2s;
`;
const CustomIcon = styled.button`
  font-size: ${({ theme }) => theme.typography.size.sub1};
  height: 100%;
  background: ${({ theme }) => theme.colors.primary};
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  outline: none;
  cursor: pointer;
  transition: all ease-in-out 0.2s;
  padding: 0;
  svg {
    height: 100%;
    color: ${({ theme }) => theme.colors.secondary};
  }
  &:hover {
    background: ${({ theme }) => hexToHsl(theme.colors.primary, 20)};
    color: ${(props) => props.theme.colors.gray200};
  }
  &:disabled {
    cursor: not-allowed;
    color: ${(props) => props.theme.colors.gray200};
  }
  &.left {
    position: absolute;
    left: 0;
    top: 0;
  }
  &.right {
    position: absolute;
    right: 0;
    top: 0;
  }
`;

const CaretLeft = dynamic<IconProps>(() =>
  import("phosphor-react").then((mod) => mod.CaretLeft)
);

const CaretRight = dynamic<IconProps>(() =>
  import("phosphor-react").then((mod) => mod.CaretRight)
);

const TabButtons: React.FC<TabButtonsProps> = function TabButtons({
  buttons,
  changeTab,
  activeTab,
}: TabButtonsProps) {
  const widthRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const [isOverflowing, setIsOverflowing] = React.useState(false);
  const scrollOffset = 120;
  const scrollRight = () => {
    widthRef.current.scrollLeft -= scrollOffset;
  };
  const scrollLeft = () => {
    widthRef.current.scrollLeft += scrollOffset;
  };

  const checkOverflow = () => {
    const el = widthRef.current;
    if (el && el.offsetWidth < el.scrollWidth) {
      setIsOverflowing(true);
    } else {
      setIsOverflowing(false);
    }
  };
  React.useEffect(() => {
    checkOverflow();
  }, [widthRef]);
  React.useEffect(() => {
    window.addEventListener("resize", checkOverflow);

    return () => {
      window.removeEventListener("resize", checkOverflow);
    };
  }, []);
  return (
    <div style={{ position: "relative" }} className="tab-buttons-container">
      {isOverflowing && (
        <CustomIcon
          className="left"
          disabled={false}
          onClick={() => scrollRight()}
        >
          <CaretLeft />
        </CustomIcon>
      )}
      <div
        className="tab-buttons"
        style={{ padding: isOverflowing ? "0 20px" : 0 }}
        ref={widthRef}
      >
        {buttons.map((button, key) => {
          const keyButton = `button-${key}`;
          return (
            <CustomButton
              key={keyButton}
              type="button"
              className={`tab-button ${button.index === activeTab && "active"}`}
              onClick={() => changeTab(button.index)}
            >
              {button.label}
            </CustomButton>
          );
        })}
      </div>
      {isOverflowing && (
        <CustomIcon
          className="right"
          disabled={false}
          onClick={() => scrollLeft()}
        >
          <CaretRight />
        </CustomIcon>
      )}
    </div>
  );
};

export const Tabs: React.FC<TabsProps> = function Tabs(props: TabsProps) {
  const { children, activeTab, onChangeTab, ...rest } = props;
  let content: React.ReactNode = <div />;
  const buttons: TabButtonProps = [];
  const tabs = React.Children.toArray(
    children
  ) as React.ReactElement<TabProps>[];
  tabs.forEach((child) => {
    if (child) {
      const childProps = child.props;
      buttons.push({ label: childProps.label, index: childProps.index });
      if (childProps.index === activeTab) content = childProps.children;
    }
  });

  return (
    <StyledTabs activeTab={activeTab} {...rest}>
      <TabButtons
        activeTab={activeTab}
        buttons={buttons}
        changeTab={onChangeTab}
      />
      <div className="tab-content">{content}</div>
    </StyledTabs>
  );
};

export const Tab: React.FC<TabProps> = function Tab(props: TabProps) {
  const { children } = props;
  return <div className="tab-panel">{children}</div>;
};
