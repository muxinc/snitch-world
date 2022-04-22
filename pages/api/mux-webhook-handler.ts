import type { NextApiRequest, NextApiResponse } from 'next';

import { getBase } from '@/data/base';
import { LivestreamStateArray, StudioInstance } from '@/data/types';

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  console.log('webhook_payload', req.body);

  const { id, status } = req.body.data;

  const state = LivestreamStateArray.find(stateEnum => stateEnum === status);

  // If the state is recognized, we update the entry
  if(state) {
    const studioInstance:StudioInstance = {
      livestreamId: id,
      state
    };

    getBase().update(studioInstance);
  }

  // TODO - Implement a webhook handler for disabled to trigger deletion of livestream/studio

  res.status(200).json({ accepted: true });
}
