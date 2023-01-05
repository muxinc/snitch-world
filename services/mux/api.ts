import axios from 'axios';

const client = axios.create({
  baseURL: process.env.MUX_API_BASE_URL,
  auth: {
    username: process.env.MUX_ACCESS_TOKEN_ID || '',
    password: process.env.MUX_SECRET_KEY || ''
  }
});

export const createLivestream = async () => {
  const { data } = await client.post('video/v1/live-streams', {
    max_continuous_duration: 1800 * 3,
    latency_mode: "low",
    playback_policy: "public",
    new_asset_settings: {
      playback_policy: "public"
    }
  });

  return data;
};

export const deleteLivestream = async (livestreamId:string) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  await client.delete(`video/v1/live-streams/${livestreamId}`, config);
};

export const getSpace = async (spaceId:string) => {
  const { data } = await client.get(`video/v1/spaces/${spaceId}`);

  return data;
};

export const createSpace = async () => {
  const { data } = await client.post('video/v1/spaces', {});

  return data;
};

export const deleteSpace = async (spaceId:string) => {
  await client.delete(`video/v1/spaces/${spaceId}`);
};

export const createSpaceBroadcast = async (spaceId:string, livestreamId:string) => {
  const { data } = await client.post(
    `/video/v1/spaces/${spaceId}/broadcasts`,
    {
      live_stream_id: livestreamId,
      layout: 'active-speaker'
    }
  );

  return data;
};

export const deleteSpaceBroadcast = async (spaceId:string, broadcastId:string) => {
  await client.delete(`video/v1/spaces/${spaceId}/broadcasts/${broadcastId}`);
}

export const startBroadcast = async (spaceId:string, broadcastId:string) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const { data } = await client.post(`/video/v1/spaces/${spaceId}/broadcasts/${broadcastId}/start`, config);

  return data;
};

export const stopBroadcast = async (spaceId:string, broadcastId:string) => {
  const { data } = await client.post(`/video/v1/spaces/${spaceId}/broadcasts/${broadcastId}/stop`);

  return data;
};
