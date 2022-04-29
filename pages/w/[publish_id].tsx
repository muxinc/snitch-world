import React from 'react';
import { useRouter } from 'next/router';
import PubNub from 'pubnub';
import { PubNubProvider } from 'pubnub-react';

import ChatBox from '@/components/chat-box';
import Player from '@/components/player/mux-player';
import { ReactionPresenter } from '@/components/reactions';
import LayoutWatch from '@/layout/layout-watch';
import style from './index.module.css';

const Watch = () => {
  const [publishId, setPublishId] = React.useState<string>();

  const router = useRouter();
  const { publish_id } = router.query;

  const client = new PubNub({
    publishKey: process.env.NEXT_PUBLIC_PUBNUB_PUBLISH_KEY,
    subscribeKey: process.env.NEXT_PUBLIC_PUBNUB_SUBSCRIBER_KEY!,
    uuid: 'userId',
  });

  React.useEffect(() => { console.log(`${publishId}-reactions`)
    client.addListener({ message: (e:any) => console.log(e) });
    client.subscribe({ channels: [`${publishId}-reactions`] });
  }, [client, publishId]);

  React.useEffect(() => {
    if(publish_id === undefined) return;

    setPublishId(publish_id.toString());
  }, [publish_id]);

  if(publishId === undefined) return null;
  
  return (
    <LayoutWatch>
      <PubNubProvider client={client}>
        <div className={style.container}>
          <div className={style.playerContainer}>
            <Player channel={publishId} />
            <ReactionPresenter channel={publishId} />
          </div>
          <div className={style.chatBoxContainer}>
            <ChatBox channel={publishId} />
          </div>
        </div>
        <div>hello</div>
      </PubNubProvider>
    </LayoutWatch>
  );
};

export default Watch;
