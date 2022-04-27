import got from 'got';
import { getDataJwt } from '@/utils/secrets';

const client = got.extend({
  prefixUrl: process.env.MUX_STATS_BASE_URL
});

export const getStatCounts = async (playbackId:string) => {
  const token = getDataJwt(playbackId);
  
  const { data } = await client.get('counts', {
    searchParams: { token }
  }).json();

  return data;
};
