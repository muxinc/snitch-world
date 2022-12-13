import axios from 'axios';

const client = axios.create({
  baseURL: process.env.MUX_API_BASE_URL,
  auth: {
    username: process.env.MUX_ACCESS_TOKEN_ID || '',
    password: process.env.MUX_SECRET_KEY || ''
  }
});

export const createLivestream = async () => {
  const { data: { data } } = await client.post('video/v1/live-streams', {
    max_continuous_duration: 1800 * 3,
    latency_mode: "low",
    playback_policy: "public",
    new_asset_settings: {
      playback_policy: "public"
    }
  });

  return data;
};

export const createStudio = async (livestreamId:string) => {
  const { data: { data } } = await client.post('video/v1/studios', {
    live_stream_id: livestreamId
  });

  return data;
};
