import type { NextApiRequest, NextApiResponse } from 'next';

import { getStatCounts } from '@/services/mux';

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  try {
    const statCounts = await getStatCounts(req.query.playbackId as string);

    res.status(200).json({ statCounts });
  } catch(err) {
    console.error(err);

    // TODO - Handle these errors more gracefully
    res.status(500).json({ isException: true, message: 'Unknown issue' });
  }
}
