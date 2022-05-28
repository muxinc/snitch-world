import React from 'react';
import Pubnub from 'pubnub';
import { PubNubProvider } from 'pubnub-react';
import { Chat, MessageList, MessageInput, MessageRendererProps, StandardMessage } from "@pubnub/react-chat-components";

import usePubnubManager from '@/hooks/use-pubnub-manager';
import style from './index.module.scss';

const theme = "dark";

interface Props {
  channel: string;
  disableInput?: boolean;
}

const ChatBox = (props: Props) => {
  const { channel, disableInput } = props;

  const { uuid } = usePubnubManager();

  const [pubnub, setPubnub] = React.useState(new Pubnub({
    publishKey: process.env.NEXT_PUBLIC_PUBNUB_PUBLISH_KEY,
    subscribeKey: process.env.NEXT_PUBLIC_PUBNUB_SUBSCRIBER_KEY!,
    uuid
  }));

  React.useEffect(() => {
    setPubnub(new Pubnub({
      publishKey: process.env.NEXT_PUBLIC_PUBNUB_PUBLISH_KEY,
      subscribeKey: process.env.NEXT_PUBLIC_PUBNUB_SUBSCRIBER_KEY!,
      uuid
    }));
  }, [uuid]);

  const messageRenderer = (props: MessageRendererProps) => {
    const { time, message: { publisher, message } } = props;
    const text = (message as StandardMessage).text;

    return (
      <div className={style.chatMessageContainer}>
        <div>
          <div className={style.colors} />
        </div>
        <div className={style.metadataContainer}>
          <div className={style.metadataHeader}>
            <span className={style.metadataUuid}>{publisher}</span>
            <span className={style.metadataTime}>{time}</span>
          </div>
          <div>{text}</div>
        </div>
      </div>
    );
  };

  if(!channel) return null;

  return (
    <PubNubProvider client={pubnub}>
      <div className={style.main}>
        <Chat currentChannel={`${channel}-chat`} theme={theme}>
          <MessageList messageRenderer={messageRenderer} />
          <MessageInput />
        </Chat>
      </div>
    </PubNubProvider>
  );
};

export default ChatBox;
