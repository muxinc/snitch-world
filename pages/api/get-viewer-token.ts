import type { NextApiRequest, NextApiResponse } from 'next';

import { grant } from '@/services/pubnub';

type NextApiRequestGetViewerToken = NextApiRequest & {
  query: {
    uuid: string;
    publishId: string;
  }
};

export default async function handler(req:NextApiRequestGetViewerToken, res:NextApiResponse) {
  const uuid = req.query.uuid;
  const publishId = req.query.publishId;

  const token = await grant(uuid, publishId);

  res.status(200).json({ token });
}
