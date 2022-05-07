import React from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

import ContextProvider from 'context/';
import LayoutDefault from '@/layout/layout-default';
import Player from '@/components/player/mux-player';
import { ReactionPresenter } from '@/components/reactions';
import JoinTheChat from '@/components/join-the-chat';
import style from './index.module.css';

const ChatBoxNoSSR = dynamic(
  () => import('@/components/chat-box'),
  { ssr: false }
)

const Watch = () => {
  const [publishId, setPublishId] = React.useState<string>();

  const router = useRouter();

  React.useEffect(() => {
    setPublishId(router.query.publish_id?.toString());
  }, [router]);

  if(publishId === undefined) return null;
  
  return (
    <ContextProvider publishId={publishId}>
      <LayoutDefault>
        <div className={style.container}>
        <div className={style.playerContainer}>
          <Player publishId={publishId} />
          <ReactionPresenter publishId={publishId} />
        </div>
        <div className={style.chatBoxContainer}>
          <ChatBoxNoSSR channel={publishId} />
          <JoinTheChat />
        </div>
      </div>
      <div>hello</div>
      </LayoutDefault>
    </ContextProvider>
  );
};

export default Watch;
