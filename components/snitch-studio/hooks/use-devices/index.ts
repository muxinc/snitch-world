import { useContext } from "react";

import { UserMediaContext, UserMediaState } from "./../../context/user-media-context";

export function useDevices(): UserMediaState {
  const devices = useContext(UserMediaContext);

  return devices;
}
