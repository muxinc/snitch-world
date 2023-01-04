import type { NextApiRequest, NextApiResponse } from 'next';

import { signalLivestreamState } from '@/services/pubnub';

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  const payload = req.body;

  const { type, data } = payload;
  const { status, playback_ids } = data;

  if(type === 'video.live_stream.idle' || type === 'video.live_stream.disabled') {
    // TODO - Implement a webhook handler for disabled to trigger deletion of livestream/studio
  }

  if(playback_ids && playback_ids.length > 0) {
    const channel = playback_ids[0].id;
    const pubnubResponse = await signalLivestreamState(channel, status);

    res.status(202).json({ pubnubResponse });
  }
  else {
    res.status(200).json({ success: true });
  }
}
