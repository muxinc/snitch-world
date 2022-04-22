import React from 'react';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';

import ChatBox from '@/components/chat-box';
import style from './index.module.css';

interface Props {
  publishId: string;
}

const StudioManage = (props:Props) => {
  const { publishId } = props;

  const [selectedTab, setSelectedTab] = React.useState<number>(0);

  return (
    <div className={style.container}>
      <div className={style.topBar}>
        Top
      </div>
      <div className={style.tabContainer}>
        <Tabs
          className={style.tabs}
          selectedIndex={selectedTab}
          onSelect={(index:number) => setSelectedTab(index)}
        >
          <TabList className={style.tabList}>
            <Tab selectedClassName={style.selectedTab}>Info</Tab>
            <Tab selectedClassName={style.selectedTab}>Chat</Tab>
            <Tab selectedClassName={style.selectedTab}>Polls</Tab>
          </TabList>
          <TabPanel selectedClassName={style.visibleTabPanel}>Test 1</TabPanel>
          <TabPanel selectedClassName={style.visibleTabPanel}>
            <ChatBox channel={publishId} />
          </TabPanel>
          <TabPanel selectedClassName={style.visibleTabPanel}>Test 3</TabPanel>
        </Tabs>
      </div>
    </div>
  ) 
};

export default StudioManage;
