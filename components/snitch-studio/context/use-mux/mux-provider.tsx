import React from "react";
import axios from "axios";

import { StatCounts } from "@/types/mux";

import { MuxContext } from "./mux-context";

export const MuxProvider = (props:React.PropsWithChildren<Record<never, any>>) => {
  const { children } = props;

  const [session, setSession] = React.useState<any>();
  const [statCounts, setStatCounts] = React.useState<StatCounts>();

  const timerRef = React.useRef<NodeJS.Timer>();

  const provision = React.useCallback(async () => {
    try {
      const { data } = await axios.get('./api/session-create');

      setSession(data);
    } catch(error) {
      console.error(error);
    }
  }, []);

  const startBroadcast = async () => {
    const { id: spaceId } = session.space;
    const { id: broadcastId } = session.broadcast;
    const { origin } = window;

    const url = `${origin}/api/start-broadcast?spaceId=${spaceId}&broadcastId=${broadcastId}`;

    try {
      await fetch(url);
    } catch(error) {
      console.error(error);
    }
  };

  const stopBroadcast = async () => {
    const { id: spaceId } = session.space;
    const { id: broadcastId } = session.broadcast;
    const { origin } = window;
    
    const url = `${origin}/api/stop-broadcast?spaceId=${spaceId}&broadcastId=${broadcastId}`;

    try {
      await fetch(url);
    } catch(error) {
      console.error(error);
    }
  };

  const handleOnInterval = async () => {
    if(!session) return;
    
    const [playbackId] = session.livestream.playback_ids;
    const response = await fetch(`./api/get-stat-counts?playbackId=${playbackId.id}`);
    const json = await response.json();

    setStatCounts(json?.statCounts[0] || undefined);
  };

  React.useEffect(() => {
    if(!session) return;

    timerRef.current = setInterval(handleOnInterval, 5000);

    return () => {
      clearInterval(timerRef.current as NodeJS.Timeout);
    };
  }, [session]);

  return (
    <MuxContext.Provider value={{ session, statCounts, provision, startBroadcast, stopBroadcast }}>
      {children}
    </MuxContext.Provider>
  );
};
