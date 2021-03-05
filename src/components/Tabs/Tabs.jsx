import React from 'react';
import {
  Tab,
  TabWrapper,
  TabContainer
} from './styled';
// Static tabs info
const tabList = [{
  id: 'all',
  name: 'All songs'
}, {
  id: 'album',
  name: 'Albums'
}, {
  id: 'playlists',
  name: 'Playlists'
}];

const Tabs = ({ toggleTab, selected }) => {
  return (
    <TabContainer>
      <TabWrapper>
        {tabList.map((tab, index) => (
          <Tab
            id={tab.id}
            key={tab.id}
            onClick={toggleTab}
            isCentered={index === 1}
            selected={tab.id === selected}
          >
            {tab.name}
          </Tab>
        ))}
      </TabWrapper>
    </TabContainer>
  );
};

export { Tabs };
