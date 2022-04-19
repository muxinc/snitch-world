import React from 'react';
import { Chat, MessageList, MessageInput } from "@pubnub/react-chat-components";

import styles from './index.module.css';

const theme = "dark";

interface Props {
  channel: string;
}

const ChatBox = (props: Props) => {
  const { channel } = props;

  if(!channel) return null;
  
  return (
    <div className={styles.main}>
      <Chat currentChannel={`${channel}-chat`} theme={theme}>
        <MessageList />
        <MessageInput />
      </Chat>
    </div>
  );
};

export default ChatBox;
