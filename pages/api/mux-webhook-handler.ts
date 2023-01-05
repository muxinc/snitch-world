import type { NextApiRequest, NextApiResponse } from 'next';

import { signalLivestreamState } from '@/services/pubnub';
import { deleteLivestream, deleteSpace, deleteSpaceBroadcast, getSpace } from '@/services/mux/api';

const processLivestreamStateEvent = async (data:any) => {
  const { status, playback_ids } = data;

  const [playbackId] = playback_ids;
  const channel = playbackId.id;
  return await signalLivestreamState(channel, status);
};

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  const payload = req.body;

  const { type, data } = payload;

  switch(type) {
    case 'video.live_stream.idle': {
      const pubnubResponse = await processLivestreamStateEvent(data);
      res.status(202).json({ pubnubResponse });

      break;
    }
    case 'video.live_stream.connected': {
      const pubnubResponse = await processLivestreamStateEvent(data);
      res.status(202).json({ pubnubResponse });
      
      break;
    }
    case 'video.live_stream.active': {
      const pubnubResponse = await processLivestreamStateEvent(data);
      res.status(202).json({ pubnubResponse });
      
      break;
    }
    case 'video.space.idle': {
      const { id: spaceId } = data;

      const space = await getSpace(spaceId);
      const { broadcasts } = space.data;

      await Promise.all(broadcasts.map(async (broadcast:any) => {
        const { live_stream_id: livestreamId } = broadcast;
        await deleteSpaceBroadcast(spaceId, broadcast.id);
        await deleteLivestream(livestreamId);
      }));

      await deleteSpace(spaceId);

      res.status(202).json({ success: true });

      break;
    }
    default: {
      res.status(200).json({ success: true });

      break;
    }
  }
}
