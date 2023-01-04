import React, { ReactNode, useCallback, useState } from "react";
import {
  CreateLocalMediaOptions,
  getUserMedia,
  LocalTrack,
  TrackSource,
} from "@mux/spaces-web";

import { UserMediaContext } from "./";

const defaultAudioConstraints = {
  autoGainControl: true,
  echoCancellation: true,
  noiseSuppression: true
};

const defaultCameraOption: CreateLocalMediaOptions = {
  video: {},
};

const defaultMicrophoneOption: CreateLocalMediaOptions = {
  audio: { constraints: defaultAudioConstraints },
};

const noCameraOption: CreateLocalMediaOptions = {
  video: false,
};

const noMicrophoneOption: CreateLocalMediaOptions = {
  audio: false,
};

const defaultMicrophoneCameraOptions: CreateLocalMediaOptions = {
  ...defaultCameraOption,
  ...defaultMicrophoneOption,
};

type Props = {
  children: ReactNode;
};

export const UserMediaProvider: React.FC<Props> = ({ children }) => {
  const [microphoneDevices, setMicrophoneDevices] = useState<InputDeviceInfo[]>(
    []
  );
  const [activeMicrophone, setActiveMicrophone] = useState<LocalTrack>();
  const [cameraDevices, setCameraDevices] = useState<InputDeviceInfo[]>([]);
  const [activeCamera, setActiveCamera] = useState<LocalTrack>();
  const [userMediaError, setUserMediaError] = useState<string>();

  async function loadDevices() {
    const availableDevices = await navigator.mediaDevices.enumerateDevices();

    const audioInputDevices = availableDevices.filter(
      (device) => device.kind === "audioinput"
    );
    setMicrophoneDevices(audioInputDevices);

    const videoInputDevices = availableDevices.filter(
      (device) => device.kind === "videoinput"
    );
    setCameraDevices(videoInputDevices);
  }

  const requestPermissionAndPopulateDevices = useCallback(async () => {
    let options = { ...defaultMicrophoneCameraOptions };
    const tracks = await getUserMedia(options);
    tracks.forEach((track) => track.track.stop());
    await loadDevices();
  }, []);

  const requestPermissionAndGetLocalMedia = useCallback(
    async (microphoneDeviceId?: string, cameraDeviceId?: string) => {
      let options = { ...defaultMicrophoneCameraOptions };
      if (typeof microphoneDeviceId === "undefined") {
        options["audio"] = false;
      } else if (microphoneDeviceId !== "") {
        options["audio"] = {
          constraints: {
            deviceId: { exact: microphoneDeviceId },
            ...defaultAudioConstraints,
          },
        };
      }
      if (typeof cameraDeviceId === "undefined") {
        options["video"] = false;
      } else if (cameraDeviceId !== "") {
        options["video"] = {
          constraints: {
            deviceId: { exact: cameraDeviceId },
          },
        };
      }

      let tracks: LocalTrack[] = [];
      try {
        tracks = await getUserMedia(options);
      } catch (e: any) {
        if (
          e.name == "NotAllowedError" ||
          e.name == "PermissionDeniedError" ||
          e instanceof DOMException
        ) {
          // permission denied to camera
          setUserMediaError("NotAllowedError");
        } else if (
          e.name == "OverconstrainedError" ||
          e.name == "ConstraintNotSatisfiedError"
        ) {
          tracks = await getUserMedia({ audio: true, video: true });
        } else {
          setUserMediaError(e.name);
        }
      }

      tracks.forEach((track) => {
        switch (track.source) {
          case TrackSource.Microphone:
            setActiveMicrophone(track);
            break;
          case TrackSource.Camera:
            setActiveCamera(track);
            break;
        }
      });

      await loadDevices();

      return tracks;
    },
    []
  );

  const getMicrophoneDevice = useCallback(
    async (deviceId: string) => {
      let options = {
        ...defaultMicrophoneOption,
        ...noCameraOption,
      };
      if (deviceId !== "") {
        options["audio"] = {
          constraints: {
            deviceId: { exact: deviceId },
            ...defaultAudioConstraints,
          },
        };
      }

      let tracks: LocalTrack[] = [];
      try {
        tracks = await getUserMedia(options);
      } catch (e: any) {
        // May occur if previously set device IDs are no longer available
        if (
          e.name == "NotAllowedError" ||
          e.name == "PermissionDeniedError" ||
          e instanceof DOMException
        ) {
          // permission denied to camera
          setUserMediaError("NotAllowedError");
        } else if (
          e.name == "OverconstrainedError" ||
          e.name == "ConstraintNotSatisfiedError"
        ) {
          setUserMediaError("OverconstrainedError");
        } else {
          setUserMediaError(e.name);
        }
      }

      tracks.forEach((track) => {
        switch (track.source) {
          case TrackSource.Microphone:
            setActiveMicrophone(track);
            break;
        }
      });

      return tracks;
    },
    []
  );

  const getCameraDevice = useCallback(async (deviceId: string) => {
    let options = {
      ...defaultCameraOption,
      ...noMicrophoneOption,
    };
    if (deviceId !== "") {
      options["video"] = {
        constraints: {
          deviceId: { exact: deviceId },
        },
      };
    }

    let tracks: LocalTrack[] = [];
    try {
      tracks = await getUserMedia(options);
    } catch (e: any) {
      // May occur if previously set device IDs are no longer available
      if (
        e.name == "NotAllowedError" ||
        e.name == "PermissionDeniedError" ||
        e instanceof DOMException
      ) {
        // permission denied to camera
        setUserMediaError("NotAllowedError");
      } else if (
        e.name == "OverconstrainedError" ||
        e.name == "ConstraintNotSatisfiedError"
      ) {
        setUserMediaError("OverconstrainedError");
      } else {
        setUserMediaError(e.name);
      }
    }

    tracks.forEach((track) => {
      switch (track.source) {
        case TrackSource.Camera:
          setActiveCamera(track);
          break;
      }
    });

    return tracks;
  }, []);

  return (
    <UserMediaContext.Provider
      value={{
        userMediaError,
        requestPermissionAndPopulateDevices,
        requestPermissionAndGetLocalMedia,

        activeMicrophone,
        microphoneDevices,
        getMicrophoneDevice,

        activeCamera,
        cameraDevices,
        getCameraDevice,
      }}
    >
      {children}
    </UserMediaContext.Provider>
  );
};