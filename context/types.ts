export enum LivestreamStateEnum { 
  idle = 'idle', 
  connected = 'connected', 
  active = 'active'
};

export type LivestreamStateKeys = keyof typeof LivestreamStateEnum; 
export const LivestreamStateArray = Object.keys(LivestreamStateEnum);

export enum Reaction {
  '🙂' = '🙂',
  '😂' = '😂',
  '😍' = '😍',
  '😢' = '😢',
  '😱' = '😱',
  '😡' = '😡'
};

export const ReactionArray = Object.values(Reaction);
