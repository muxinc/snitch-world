import React from 'react';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import Pubnub from 'pubnub';
import { usePubNub } from 'pubnub-react';

import ChatBox from '@/components/chat-box';
import { StatCounts } from '@/types/mux';
import { LivestreamStateEnum, ReactionArray } from '@/services/pubnub/types';
import { ReactionPill } from '@/components/reactions';
import style from './index.module.css';
import ButtonDropdown from '@/components/button-dropdown';

interface Props {
  publishId: string;
  statCounts?: StatCounts
}

const StudioManage = (props:Props) => {
  const { publishId, statCounts } = props;

  const [selectedTab, setSelectedTab] = React.useState<number>(0);
  const [state, setState] = React.useState<string>(LivestreamStateEnum.idle);
  const [reactions, setReactions] = React.useState<{[key:string]: string }>(
    ReactionArray.reduce((a, v) => ({ ...a, [v]: 0}), {})
  );

  const handlePubnubOnSignal = ({ message }: Pubnub.SignalEvent) => setState(message.state);

  const handlePubnubOnMessage = ({ message }: Pubnub.MessageEvent) => {
    setReactions((prev) => ({ ...prev, [message.reaction]: prev[message.reaction] + 1 }));
  };

  const client = usePubNub();

  React.useEffect(() => {
    client.addListener({
      signal: handlePubnubOnSignal,
      message: handlePubnubOnMessage
    });
  
    client.subscribe({
      channels: [
        `${publishId}-livestream_state`,
        `${publishId}-reactions`
      ]
    });

    return () => {
      client.unsubscribeAll();
      client.removeListener({
        signal: handlePubnubOnSignal,
        message: handlePubnubOnMessage
      });
    };
  }, []);

  React.useEffect(() => {
    // TODO - When the state falls into a 'disabled' state, we need to
    // nav the user to a "Thank you for using Snitch" patge
  }, [state]);

  const pills = ReactionArray.map(reaction => <ReactionPill key={reaction} emoji={reaction} text={reactions[reaction]} />);

  return (
    <div className={style.container}>
      <div className={style.topBar}>
        <div>
          <ButtonDropdown />
        </div>
      </div>
      <div className={style.tabContainer}>
        <Tabs
          className={style.tabs}
          selectedIndex={selectedTab}
          forceRenderTabPanel={true}
          onSelect={(index:number) => setSelectedTab(index)}
        >
          <TabList className={style.tabList}>
            <Tab selectedClassName={style.selectedTab}>Info</Tab>
            <Tab selectedClassName={style.selectedTab}>Chat</Tab>
            {/* <Tab selectedClassName={style.selectedTab}>Polls</Tab> */}
          </TabList>
          <TabPanel
            className={selectedTab !== 0 ? style.invisibleTabPanel : ''}
            selectedClassName={style.visibleTabPanel}
          >
            <div className={style.infoTabRow}>
              <div className={style.infoTabCol}>
                <div className={style.infoHeader}>Status</div>
                <div>{state}</div>
              </div>
              <div className={style.infoTabCol}>
                <div className={style.infoHeader}>Viewer count</div>
                <div>{statCounts?.viewers}</div>
              </div>
            </div>
            <div className={style.infoTabRow}>
              <div className={style.infoTabCol}>
                {/* <div>Player link</div> */}
                <div>
                  <a href={`./w/${publishId}`} target="_blank">Player link</a>
                </div>
              </div>
            </div>
            <div className={style.infoTabRow}>
              <div className={style.infoTabCol}>
                <div className={style.infoHeader}>Reactions</div>
                <div>
                  {pills}
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel
            className={selectedTab !== 1 ? style.invisibleTabPanel : ''}
            selectedClassName={style.visibleTabPanel}
          >
            <ChatBox channel={publishId} />
          </TabPanel>
          {/* <TabPanel
            className={selectedTab !== 2 ? style.invisibleTabPanel : ''}
            selectedClassName={style.visibleTabPanel}
          >
            Test 3
          </TabPanel> */}
        </Tabs>
      </div>
    </div>
  ) 
};

export default StudioManage;
