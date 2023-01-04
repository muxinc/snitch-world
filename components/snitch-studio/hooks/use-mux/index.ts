import { useContext } from "react";

import { MuxContext } from "../../context/use-mux";
import { MuxState } from "../../context/use-mux/mux-context";

export function useMux(): MuxState {
  const mux = useContext(MuxContext);

  return mux;
};
