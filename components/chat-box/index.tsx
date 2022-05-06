import React from 'react';
import Pubnub from 'pubnub';
import { PubNubProvider } from 'pubnub-react';
import { Chat, MessageList, MessageInput } from "@pubnub/react-chat-components";

import usePubnubManager from '@/hooks/use-pubnub-manager';
import styles from './index.module.css';

const theme = "dark";

interface Props {
  channel: string;
  disableInput?: boolean;
}

const ChatBox = (props: Props) => {
  const { channel, disableInput } = props;

  const { uuid } = usePubnubManager();

  const pubnubRef = React.useRef(new Pubnub({
    publishKey: process.env.NEXT_PUBLIC_PUBNUB_PUBLISH_KEY,
    subscribeKey: process.env.NEXT_PUBLIC_PUBNUB_SUBSCRIBER_KEY!,
    uuid
  }));

  if(!channel) return null;

  return (
    <PubNubProvider client={pubnubRef.current}>
      <div className={styles.main}>
        <Chat currentChannel={`${channel}-chat`} theme={theme}>
          <MessageList />
          <MessageInput />
        </Chat>
      </div>
    </PubNubProvider>
  );
};

export default ChatBox;
