export enum LivestreamStateEnum { 
  idle = 'idle', 
  connected = 'connected', 
  active = 'active'
};

export type LivestreamStateKeys = keyof typeof LivestreamStateEnum; 
export const LivestreamStateArray = Object.keys(LivestreamStateEnum);

export interface StudioStateMessage {
  livestreamId?: string;
  studioId?: string;
  playbackId?: string;
  state?: string;
};
