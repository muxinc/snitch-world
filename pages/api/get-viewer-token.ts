import type { NextApiRequest, NextApiResponse } from 'next';

import { grant } from '@/services/pubnub';

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  const uuid = req.query.uuid as string;
  const publishId = req.query.publishId as string;

  const token = await grant(uuid, publishId);

  console.log('token', token);

  res.status(200).json({ token });
}
