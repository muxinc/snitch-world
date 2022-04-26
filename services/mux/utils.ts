import jwt from 'jsonwebtoken';

const signToken = (payload:object, privateKey:string) => {
  console.log('jwt-payload', payload);

  const privateKeyBuffer = Buffer.from(privateKey, 'base64');

  return jwt.sign(payload, privateKeyBuffer, { algorithm: 'RS256'});
}

const getStudioJwt = (studioId:string, uuid: string, role: 'host' | 'guest') => {
  if(!process.env.MUX_VIDEO_SIGNING_PRIVATE_KEY) {
    throw new Error('No JWT private key set');
  }

  const payload = {
    sub: studioId,
    aud: 'studio',
    kid: process.env.MUX_VIDEO_SIGNING_KEY,
    exp: Date.now() + (1000 * 60),
    role, 
    pid: uuid
  };
  
  return signToken(
    payload,
    process.env.MUX_VIDEO_SIGNING_PRIVATE_KEY
  );
};

const getDataJwt = (playbackId:string) => {
  if(!process.env.MUX_DATA_SIGNING_PRIVATE_KEY) {
    throw new Error('No JWT private key set');
  }

  const payload = {
    sub: playbackId,
    aud: 'playback_id',
    kid: process.env.MUX_DATA_SIGNING_KEY,
    exp: Date.now() + (1000 * 60)
  };

  return signToken(
    payload,
    process.env.MUX_DATA_SIGNING_PRIVATE_KEY
  );
};

export {
  getStudioJwt,
  getDataJwt
};
