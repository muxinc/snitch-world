import { useContext } from "react";

import { MuxContext, MuxState } from "../../context/use-mux";

export function useMux(): MuxState {
  const mux = useContext(MuxContext);

  return mux;
};
