import Pubnub from 'pubnub';

import { decryptServiceSecret } from '@/utils/secrets';

import { LivestreamStateArray } from '@/context/types';

const client = new Pubnub({
  publishKey: process.env.NEXT_PUBLIC_PUBNUB_PUBLISH_KEY,
  subscribeKey: process.env.NEXT_PUBLIC_PUBNUB_SUBSCRIBER_KEY!,
  secretKey: decryptServiceSecret(process.env.PUBNUB_SECRET_KEY_ENCRYPTED!),
  uuid: 'snitch-world-system',
});

const signalLivestreamState = async (channel:string, status:string) => {
  const state = LivestreamStateArray.find(stateEnum => stateEnum === status);

  const response = await client.signal({
    channel: `${channel}-livestream_state`,
    message: { state }
  });

  return response;
};

const grant = async (uuid:string, publishId:string) => {
  if(uuid === 'anonymous') {
    return await client.grantToken({
      ttl: 11, // TODO - This probably should be based on a global config that also determines max livestream duration
      authorized_uuid: uuid,
      patterns: {
        channels: {
          [`^${publishId}-[A-Za-z_]$`]: {
            read: true
          }
        }
      }
    });
  }
  else {
    return await client.grantToken({
      ttl: 11, // TODO - This probably should be based on a global config that also determines max livestream duration
      authorized_uuid: uuid,
      resources: {
        channels: {
          [`${publishId}-chat`]: {
              read: true,
              write: true
          },
          [`${publishId}-reactions`]: {
            read: true,
            write: true
          },
          [`${publishId}-livestream_state`]: {
            read: true,
            write: true
          }
        }
      }
    });
  }
};

export {
  signalLivestreamState,
  grant
};
