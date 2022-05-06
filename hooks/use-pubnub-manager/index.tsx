import React from 'react';
import { useRouter } from 'next/router';
import Pubnub from 'pubnub';

import { Context } from 'context/';

function usePubnubManager() {
  const { uuid, eventEmitter, setUuid } = React.useContext(Context);

  const router = useRouter();

  const updateUuid = (uuid:string) => {
    setUuid(uuid);
    router.reload();
  };

  const addMessageListener = (handler:(message: Pubnub.MessageEvent) => void) => {
    eventEmitter.addListener('message', handler);
  };

  const addSignalListener = (handler:(signal: Pubnub.SignalEvent) => void) => {
    eventEmitter.addListener('signal', handler);
  };

  return {
    addMessageListener,
    addSignalListener,
    updateUuid,
    uuid
  };
}

export default usePubnubManager;
