import React from 'react';
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
  setUuid: (uuid:string) => Promise<boolean>;
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
    uuid,
    children
  } = props;

  const [_uuid, _setUuid] = React.useState(uuid || getCookie('uuid')?.toString() || 'anonymous');

  // HACK - Full perms, should be scoped (post-TMI?)
  const [pubnub, setPubnub] = React.useState<Pubnub>(new Pubnub({
    publishKey: process.env.NEXT_PUBLIC_PUBNUB_PUBLISH_KEY,
    subscribeKey: process.env.NEXT_PUBLIC_PUBNUB_SUBSCRIBER_KEY!,
    uuid: _uuid
  }));

  if(!_uuid) {
    throw new Error('No uuid provided');
  }

  const init = async (uuid:string) => {
    pubnub.stop();
    pubnub.unsubscribeAll();
    pubnub.removeListener({
      message: handleMessage,
      signal: handleSignal
    });

    // HACK - Full perms, should be scoped (post-TMI?)
    const newPubnub = new Pubnub({
      publishKey: process.env.NEXT_PUBLIC_PUBNUB_PUBLISH_KEY,
      subscribeKey: process.env.NEXT_PUBLIC_PUBNUB_SUBSCRIBER_KEY!,
      uuid
    });

    newPubnub.subscribe({
      channels: [
        `${publishId}-reactions`,
        `${publishId}-cta`,
        `${publishId}-livestream_state`
      ]
    });

    newPubnub.addListener({
      message: handleMessage,
      signal: handleSignal
    });

    console.debug('getSubscribedChannels:', newPubnub.getSubscribedChannels());

    setPubnub(newPubnub);
  };

  const eventEmitterRef = React.useRef(new Events.EventEmitter());

  const handleMessage = (message:Pubnub.MessageEvent) => {
    console.debug('pubnub message:', message);
    eventEmitterRef.current.emit('message', message);
  };

  const handleSignal = (signal:Pubnub.SignalEvent) => {
    console.debug('pubnub signal:', signal);
    eventEmitterRef.current.emit('signal', signal);
  };

  React.useEffect(() => {
    init(_uuid);

    return () => { 
      pubnub.unsubscribeAll();
      pubnub.removeListener({
        message: handleMessage,
        signal: handleSignal
      });
      eventEmitterRef.current.removeAllListeners();
    };
  }, []);

  const setUuid = async (uuid: string) => {
    const response = await fetch(`/api/check-user-presence?uuid=${uuid}&publishId=${publishId}`);
    const result = await response.json();

    if(result.isUserPresent) return false;

    init(uuid);
    pubnub!.setUUID(uuid);
    _setUuid(uuid);
    setCookies('uuid', uuid);

    return true;
  };

  const initialState:ContextStateAndActions = {
    publishId,
    uuid: _uuid,
    eventEmitter: eventEmitterRef.current,
    setUuid
  };

  return (
    <Context.Provider value={initialState}>
      <PubNubProvider client={pubnub}>
        {children}
      </PubNubProvider>
    </Context.Provider>
  );
};

export default ContextProvider;
export { Context };
