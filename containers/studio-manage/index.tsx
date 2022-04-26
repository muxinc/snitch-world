import React from 'react';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';

import ChatBox from '@/components/chat-box';
import style from './index.module.css';
import { StatCounts } from '@/types/mux';

interface Props {
  publishId: string;
  statCounts?: StatCounts
}

const StudioManage = (props:Props) => {
  const { publishId, statCounts } = props;

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
          <TabPanel selectedClassName={style.visibleTabPanel}>
            <div className={style.infoTabRow}>
              <div className={style.infoTabCol}>
                <div>Status</div>
                <div>Idle</div>
              </div>
              <div className={style.infoTabCol}>
                <div>Engagement stats</div>
                <div>{statCounts?.viewers}</div>
              </div>
            </div>
            <div className={style.infoTabRow}>
              <div className={style.infoTabCol}>
                <div>Player link</div>
                <div>
                  <a href={`./w/${publishId}`} target="_blank">Player link</a>
                </div>
              </div>
            </div>
            <div className={style.infoTabRow}>
              <div className={style.infoTabCol}>
                <div>Reactions</div>
                <div>
                  
                </div>
              </div>
            </div>
          </TabPanel>
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
