import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const decryptServiceSecret = (message:string) => {
  const decipher = crypto.createDecipheriv(
    'aes-128-cbc',
    process.env.SERVICE_ENCRYPTION_KEY!,
    process.env.SERVICE_ENCRYPTION_IV!
  );

  let decrypted = decipher.update(message, 'base64', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
};

const signToken = (payload:object, privateKey:string) => {
  console.log('jwt-payload', payload);

  const privateKeyBuffer = Buffer.from(privateKey, 'base64');

  return jwt.sign(payload, privateKeyBuffer, { algorithm: 'RS256'});
}

const getStudioJwt = (studioId:string, uuid: string, role: 'host' | 'guest') => {
  if(!process.env.MUX_VIDEO_SIGNING_PRIVATE_KEY_ENCRYPTED) {
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
    decryptServiceSecret(process.env.MUX_VIDEO_SIGNING_PRIVATE_KEY_ENCRYPTED)
  );
};

const getDataJwt = (playbackId:string) => {
  if(!process.env.MUX_DATA_SIGNING_PRIVATE_KEY_ENCRYPTED) {
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
    decryptServiceSecret(process.env.MUX_DATA_SIGNING_PRIVATE_KEY_ENCRYPTED)
  );
};

export {
  decryptServiceSecret,
  getStudioJwt,
  getDataJwt
};
