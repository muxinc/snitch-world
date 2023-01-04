import type { NextApiRequest, NextApiResponse } from 'next';

import { startBroadcast } from '@/services/mux';

type NextApiRequestStartBroadcast = NextApiRequest & {
  query: {
    spaceId: string;
    broadcastId: string;
  }
};

export default async function handler(req:NextApiRequestStartBroadcast, res:NextApiResponse) {
  try {
    await startBroadcast(req.query.spaceId, req.query.broadcastId);

    res.status(200).json({ success: true });
  } catch(err) {
    console.error(err);

    // TODO - Handle these errors more gracefully
    res.status(500).json({ isException: true, message: 'Unknown issue' });
  }
}
