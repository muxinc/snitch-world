import type { NextApiRequest, NextApiResponse } from 'next';

import { stopBroadcast } from '@/services/mux';

type NextApiRequestStopBroadcast = NextApiRequest & {
  query: {
    spaceId: string;
    broadcastId: string;
  }
};

export default async function handler(req:NextApiRequestStopBroadcast, res:NextApiResponse) {
  try {
    await stopBroadcast(req.query.spaceId, req.query.broadcastId);

    res.status(200).json({ success: true });
  } catch(err) {
    console.error(err);

    // TODO - Handle these errors more gracefully
    res.status(500).json({ isException: true, message: 'Unknown issue' });
  }
}
