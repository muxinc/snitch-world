import React from 'react';

import InputSelect, { InputSelectChangeHandler } from '@/components/input-select';
import MicOnIcon from '@/public/icons/mic-on.svg';
import VideoOnIcon from '@/public/icons/video-on.svg';

import { useDevices } from '../hooks/use-devices';
import { normalizeItems } from '../utils';

const Settings = () => {
  const [microphoneDeviceIndex, setMicrophoneDeviceIndex] = React.useState<number>();
  const [cameraDeviceIndex, setCameraDeviceIndex] = React.useState<number>();

  const { cameraDevices, microphoneDevices, activeCamera, activeMicrophone, requestPermissionAndGetLocalMedia } = useDevices();

  React.useEffect(() => {
    setMicrophoneDeviceIndex(microphoneDevices.findIndex(device => device.deviceId === activeMicrophone?.deviceId));
    setCameraDeviceIndex(cameraDevices.findIndex(device => device.deviceId === activeCamera?.deviceId));
  }, []);

  React.useEffect(() => {
    if(!cameraDeviceIndex && !microphoneDeviceIndex) return;

    const microphoneDevice = microphoneDeviceIndex && microphoneDevices[microphoneDeviceIndex];
    const cameraDevice = cameraDeviceIndex && cameraDevices[cameraDeviceIndex];

    requestPermissionAndGetLocalMedia(microphoneDevice ? microphoneDevice?.deviceId : '', cameraDevice ? cameraDevice?.deviceId : '');
  }, [microphoneDeviceIndex, cameraDeviceIndex]);

  const handleOnMicrophonehange:InputSelectChangeHandler<number> = async (index) => setMicrophoneDeviceIndex(index);
  const handleOnCameraChange:InputSelectChangeHandler<number> = async (index) => setCameraDeviceIndex(index);

  const selectedMicrophoneIndex = microphoneDeviceIndex && microphoneDevices.findIndex(device => device.deviceId === microphoneDevices[microphoneDeviceIndex]?.deviceId);
  const selectedCameraIndex = cameraDeviceIndex && cameraDevices.findIndex(device => device.deviceId === cameraDevices[cameraDeviceIndex]?.deviceId);

  return (
    <>
      <InputSelect
        label="Microphone"
        Icon={MicOnIcon}
        items={microphoneDevices}
        selectedIndex={selectedMicrophoneIndex}
        normalizeItems={normalizeItems} 
        onChange={handleOnMicrophonehange}
        />
      <InputSelect
        label="Video"
        Icon={VideoOnIcon}
        items={cameraDevices}
        selectedIndex={selectedCameraIndex}
        normalizeItems={normalizeItems} 
        onChange={handleOnCameraChange}
      />
    </>
  );
}

export default Settings;
