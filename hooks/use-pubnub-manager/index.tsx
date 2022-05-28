import React from 'react';
import Pubnub from 'pubnub';

import { Context } from 'context/';

function usePubnubManager() {
  const { uuid, eventEmitter, setUuid } = React.useContext(Context);

  const updateUuid = async (uuid:string): Promise<boolean> => setUuid(uuid);

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
