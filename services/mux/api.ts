import got from 'got';
import { decryptServiceSecret } from '@/utils/secrets';

const client = got.extend({
  prefixUrl: process.env.MUX_API_BASE_URL,
  username: process.env.MUX_ACCESS_TOKEN_ID,
  password: decryptServiceSecret(process.env.MUX_SECRET_KEY_ENCRYPTED!)
});

export const createLivestream = async () => {
  const { data } = await client.post('video/v1/live-streams', {
    json: {
      max_continuous_duration: 1800,
      latency_mode: "low",
      playback_policy: "public",
      new_asset_settings: {
        playback_policy: "public"
      }
    }
  }).json();

  return data;
};

export const createStudio = async (livestreamId:string) => {
  const { data } = await client.post('video/v1/studios', {
    json: {
      live_stream_id: livestreamId
    }
  }).json();

  return data;
};
