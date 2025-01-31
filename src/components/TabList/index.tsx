import styled from "@emotion/styled";
import { Flex } from "../common/Flex";
import { css } from "@emotion/react";
import { Typography } from "../common/Typography";
const Wrapper = styled(Flex)`
  height: 48px;
  border-bottom: 1px solid #e0e0e0;
  padding: 0 0 2px;
`;

const Tab = styled.button<{ selected: boolean }>`
  padding: 0 20px;
  border-radius: 10px 10px 0 0;
  min-width: 100px;

  :hover {
    background-color: #f0f0f0;
  }

  ${({ selected }) =>
    selected &&
    css`
      background-color: #f0f0f0;
      border-bottom: 2px solid #000;
    `}
`;

interface TabListProps {
  tabs: string[];
  selectedTab: string;
  onTabClick: (tab: string) => void;
}

export const TabList = ({ tabs, selectedTab, onTabClick }: TabListProps) => {
  return (
    <Wrapper>
      {tabs.map((tab) => (
        <Tab
          key={tab}
          selected={tab === selectedTab}
          onClick={() => onTabClick(tab)}
          value={tab}
        >
          <Typography variant="title6">{tab}</Typography>
        </Tab>
      ))}
    </Wrapper>
  );
};
