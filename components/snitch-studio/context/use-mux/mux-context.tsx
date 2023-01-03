import { createContext } from "react";

import { StatCounts } from "@/types/mux";

export type MuxState = {
  session: any;
  statCounts?: StatCounts;
  provision: () => void;
  startBroadcast: () => Promise<void>;
  stopBroadcast: () => Promise<void>;
}

export const MuxContext = createContext({} as MuxState);
