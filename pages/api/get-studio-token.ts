import type { NextApiRequest, NextApiResponse } from 'next';

import { createLivestream, createStudio } from '@/services/mux';
import { getStudioJwt } from '@/utils/secrets';

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  try {
    const livestream = await createLivestream();
    console.log('livestream', livestream);

    const studio = await createStudio(livestream.id);
    console.log('studio', studio);

    const token = getStudioJwt(studio.id, 'Content Creator', 'host');

    console.log('token', token);

    const context = {
      token,
      livestreamId: livestream.id,
      studioId: studio.id,
      playbackId: livestream.playback_ids[0].id
    };

    res.status(200).json(context);
  } catch(err) {
    console.error(err);
    // TODO - Handle these errors more gracefully
    res.status(500).json({ isException: true, message: 'Unknown issue', error: err });
  }
}
