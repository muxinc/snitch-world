import type { NextApiRequest, NextApiResponse } from 'next';

import { getChannelOccupants } from '@/services/pubnub';

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  const uuid = req.query.uuid as string;
  const publishId = req.query.publishId as string;
  const channel = `${publishId}-chat`;

  const occupants = await getChannelOccupants(channel);
  const existing = occupants.find(occupant => occupant.uuid === uuid);

  if(existing) {
    res.status(200).json({ channel, isUserPresent: true });
  }
  else {
    res.status(200).json({ channel, isUserPresent: false });
  }
}
