import Pubnub from 'pubnub';

import { LivestreamStateArray } from './types';

const client = new Pubnub({
  publishKey: process.env.NEXT_PUBLIC_PUBNUB_PUBLISH_KEY,
  subscribeKey: process.env.NEXT_PUBLIC_PUBNUB_SUBSCRIBER_KEY!,
  uuid: 'snitch-world',
});

const signalLivestreamState = async (channel:string, status:string) => {
  const state = LivestreamStateArray.find(stateEnum => stateEnum === status);

  const response = await client.signal({
    channel: `${channel}-livestream_state`,
    message: { state }
  });

  return response;
};

export {
  signalLivestreamState
};
