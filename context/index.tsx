import React from 'react';
import { useRouter } from 'next/router';
import Events from 'events';
import Pubnub from 'pubnub';
import { PubNubProvider } from 'pubnub-react';
import { getCookie, setCookies } from 'cookies-next';

export type ContextState = {
  publishId: string;
  uuid: string;
  eventEmitter: Events;
}

export type ContextActions = {
  setUuid: (uuid:string) => void;
};

type ContextStateAndActions = ContextState & ContextActions;

// @ts-ignore - this is fine
const Context = React.createContext<ContextStateAndActions>({});

interface ContextProviderProps {
  uuid?: string;
  publishId: string;
}

const ContextProvider = (props:React.PropsWithChildren<ContextProviderProps>) => {
  const {
    publishId,
    uuid = getCookie('uuid')?.toString(),
    children
  } = props;

  if(!uuid) {
    throw new Error('No uuid provided');
  }

  // HACK - Full perms, should be scoped (post-TMI?)
  const pubnubRef = React.useRef(new Pubnub({
    publishKey: process.env.NEXT_PUBLIC_PUBNUB_PUBLISH_KEY,
    subscribeKey: process.env.NEXT_PUBLIC_PUBNUB_SUBSCRIBER_KEY!,
    uuid
  }));

  const eventEmitterRef = React.useRef(new Events.EventEmitter());

  const router = useRouter();

  const handleMessage = (message:Pubnub.MessageEvent) => {
    console.debug('pubnub message:', message);
    eventEmitterRef.current.emit('message', message);
  };

  const handleSignal = (signal:Pubnub.SignalEvent) => {
    console.debug('pubnub signal:', signal);
    eventEmitterRef.current.emit('signal', signal);
  };

  React.useEffect(() => {
    pubnubRef.current.subscribe({
      channels: [
        `${publishId}-reactions`,
        `${publishId}-cta`,
        `${publishId}-livestream_state`
      ]
    });

    pubnubRef.current.addListener({
      message: handleMessage,
      signal: handleSignal
    });

    console.debug('getSubscribedChannels:', pubnubRef.current.getSubscribedChannels());

    return () => { 
      if(!pubnubRef.current) return;
      
      pubnubRef.current.unsubscribeAll();
      pubnubRef.current.removeListener({
        message: handleMessage,
        signal: handleSignal
      });
      eventEmitterRef.current.removeAllListeners();
    };
  }, []);

  const setUuid = (uuid: string) => {
    setCookies('uuid', uuid);
    router.reload();
  };

  const initialState:ContextStateAndActions = {
    publishId,
    uuid,
    eventEmitter: eventEmitterRef.current,
    setUuid
  };

  return (
    <Context.Provider value={initialState}>
      <PubNubProvider client={pubnubRef.current}>
        {children}
      </PubNubProvider>
    </Context.Provider>
  );
};

export default ContextProvider;
export { Context };
