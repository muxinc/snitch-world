import { useContext } from "react";

import { UserMediaContext } from "./../../context/user-media-context";
import { UserMediaState } from "../../context/user-media-context/user-media-context";

export function useDevices(): UserMediaState {
  const devices = useContext(UserMediaContext);

  return devices;
}
