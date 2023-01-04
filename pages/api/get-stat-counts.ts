import type { NextApiRequest, NextApiResponse } from 'next';

import { getStatCounts } from '@/services/mux';

type NextApiRequestGetStatCounts = NextApiRequest & {
  query: {
    playbackId: string;
  }
};

export default async function handler(req:NextApiRequestGetStatCounts, res:NextApiResponse) {
  try {
    const statCounts = await getStatCounts(req.query.playbackId);

    res.status(200).json({ statCounts });
  } catch(err) {
    console.error(err);

    // TODO - Handle these errors more gracefully
    res.status(500).json({ isException: true, message: 'Unknown issue' });
  }
}
