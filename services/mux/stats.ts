import axios from 'axios';

import { getDataJwt } from '@/utils/secrets';

const client = axios.create({
  baseURL: process.env.MUX_STATS_BASE_URL
});

export const getStatCounts = async (playbackId:string) => {
  const token = getDataJwt(playbackId);
  
  const { data: { data} } = await client.get('counts', {
    params: { token }
  });

  return data;
};
