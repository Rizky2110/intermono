import React from "react";
import { Tab as DefaultTab, Tabs as DefaultTabs } from "ui/sc";
import styled from "styled-components";

const StyledTabs = styled("div")`
  .tab-buttons-container {
    border-bottom: 2px solid ${(props) => props.theme.colors.divider};
    font-family: "Poppins";
  }
  .tab-buttons {
    background: transparent;
    font-family: inherit;

    .active {
      font-family: inherit;
      font-weight: 500;
    }
  }

  .tab-button {
    font-weight: 500;
    font-family: inherit;
    color: ${(props) => props.theme.colors.divider};
  }
`;

const StyledLabel = styled("div")`
  display: flex;
  align-items: center;
  gap: 1rem;
  .textLabel {
    margin-block-end: 0;
    font-weight: 500;
  }
`;

export const TabLabel = function TabLabel({
  title,
  icon,
}: {
  title: string;
  icon?: React.ReactNode;
}): JSX.Element {
  return (
    <StyledLabel>
      {icon}
      <h4 className="textLabel">{title}</h4>
    </StyledLabel>
  );
};

type TabProps = {
  index: number;
  children: React.ReactNode;
  label: React.ReactNode;
};

export const Tab: React.FC<TabProps> = function Tab({
  index,
  label,
  children,
}: TabProps) {
  return (
    <StyledTabs>
      <DefaultTab index={index} label={label}>
        {children}
      </DefaultTab>
    </StyledTabs>
  );
};

type TabsProps = {
  activeIndex: number;
  onChangeTab: (tabIndex: number | string) => void;
  children: React.ReactNode;
};

export const Tabs: React.FC<TabsProps> = function Tabs({
  activeIndex,
  onChangeTab,
  children,
}: TabsProps) {
  return (
    <StyledTabs>
      <DefaultTabs
        activeTab={activeIndex}
        onChangeTab={onChangeTab}
        paletteActive="primary"
      >
        {children}
      </DefaultTabs>
    </StyledTabs>
  );
};
