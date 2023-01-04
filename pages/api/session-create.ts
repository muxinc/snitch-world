import type { NextApiRequest, NextApiResponse } from 'next';

import { createLivestream, createSpace, createSpaceBroadcast } from '../../services/mux';
import { getSpacesJwt } from '../../utils/secrets';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { data: livestream } = await createLivestream();
    const { data: space } = await createSpace(livestream.id);
    const { data: broadcast } = await createSpaceBroadcast(space.id, livestream.id);
    
    const jwt = getSpacesJwt(space.id);
    
    res.status(200).json({ space, broadcast, livestream, jwt });
  } catch(error) {
    res.status(500).json((error as Error).message);
  }
};
