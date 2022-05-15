import React from 'react';
import dynamic from 'next/dynamic';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import Pubnub from 'pubnub';

import { StatCounts } from '@/types/mux';
import { LivestreamStateEnum, ReactionArray } from '@/context/types';
import { ReactionPill } from '@/components/reactions';
import usePubnubManager from '@/hooks/use-pubnub-manager';

import style from './index.module.scss';
import Button from './button';

const ChatBoxNoSSR = dynamic(
  () => import('@/components/chat-box'),
  { ssr: false }
);

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

  const handlePubnubOnSignal = ({ message }: Pubnub.SignalEvent) => message.state && setState(message.state);

  const handlePubnubOnMessage = ({ message }: Pubnub.MessageEvent) => {
    setReactions((prev) => ({ ...prev, [message.reaction]: prev[message.reaction] + 1 }));
  };

  const { addMessageListener, addSignalListener } = usePubnubManager();

  React.useEffect(() => {
    addMessageListener(handlePubnubOnMessage);
    addSignalListener(handlePubnubOnSignal);
  }, []);

  React.useEffect(() => {
    // TODO - When the state falls into a 'disabled' state, we need to
    // nav the user to a "Thank you for using Snitch" page
  }, [state]);

  const pills = ReactionArray.map(reaction => <ReactionPill key={reaction} emoji={reaction} text={reactions[reaction]} />);

  return (
    <div className={style.container}>
      <div className={style.topBar}>
        <div>
          <Button text="Call to Action" />
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
                <div>
                  <a href={`./w/${publishId}`} rel="noopener noreferrer" target="_blank">Player link</a>
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
            <ChatBoxNoSSR channel={publishId} />
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
