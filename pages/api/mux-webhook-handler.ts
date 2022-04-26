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

    (await getBase()).update(studioInstance);
  }

  // TODO - Implement a webhook handler for disabled to trigger deletion of livestream/studio
  // TODO - Implement error response for signature validation
  // TODO - Implement error responses for general issues

  res.status(200).json({ accepted: true });
}
