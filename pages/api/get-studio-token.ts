import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

import { getBase } from '@/data/base';
import { createLivestream, createStudio } from '@/services/mux';

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  try {
    const livestream = await createLivestream();
    console.log('livestream', livestream);

    const studio = await createStudio(livestream.id);
    console.log('studio', studio);

    const payload = {
      "sub": studio.id,         
      "aud": "studio",                 
      "kid": process.env.MUX_SIGNING_KEY,
      "exp": Date.now() + (1000 * 60),
      "role": "host", // "host" or "guest"
      "pid": "erik.pena"
    };
    
    const privateKey = Buffer.from(process.env.MUX_PRIVATE_KEY!, 'base64');

    const token = jwt.sign(payload, privateKey, { algorithm: 'RS256'});

    console.log('token', token);

    const base = getBase();

    base.insert({
      livestreamId: livestream.id,
      studioId: studio.id,
      playbackId: livestream.playback_ids[0].id
    });

    res.status(200).json({ token });
  } catch(err) {
    console.error(err);
    res.status(500).json({ isException: true, message: 'Unknown issue' });
  }
}
