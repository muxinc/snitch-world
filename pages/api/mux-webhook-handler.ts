import type { NextApiRequest, NextApiResponse } from 'next';

import { publishLivestreamState } from '@/services/pubnub';

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  console.log('webhook_payload', req.body);

  // TODO - Implement error response for signature validation

  const { type, data } = req.body;
  const { status, playback_ids } = data;

  if(type === 'video.live_stream.idle' || type === 'video.live_stream.disabled') {
    // TODO - Implement a webhook handler for disabled to trigger deletion of livestream/studio
  }

  const channel = playback_ids[0].id;

  const pubnubResponse = await publishLivestreamState(channel, status);

  // TODO - Implement error responses for general issues

  res.status(200).json({ pubnubResponse });
}
