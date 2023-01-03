import type { NextApiRequest, NextApiResponse } from 'next';

import { getChannelOccupants } from '@/services/pubnub';

type NextApiRequestCheckUserPresence = NextApiRequest & {
  query: {
    uuid: string;
    publishId: string;
  }
};

export default async function handler(req:NextApiRequestCheckUserPresence, res:NextApiResponse) {
  const uuid = req.query.uuid;
  const publishId = req.query.publishId;
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
