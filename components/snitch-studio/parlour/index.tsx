import React from 'react';

import MicOnIcon from '@/public/icons/mic-on.svg';
import VideoOnIcon from '@/public/icons/video-on.svg';
import InputSelect, { InputSelectChangeHandler } from '@/components/input-select';
import Button from '@/components/button-studio';

import Video from './../video';
import styles from './index.module.scss';
import { useDevices } from '../hooks/use-devices';
import { useMux } from '../hooks/use-mux';
import { normalizeItems } from '../utils';

interface Props {
  onJoin: () => void;
};

const Parlour = (props:Props) => {
  const { onJoin } = props;

  const [microphoneDeviceIndex, setMicrophoneDeviceIndex] = React.useState<number>();
  const [cameraDeviceIndex, setCameraDeviceIndex] = React.useState<number>();

  const { session, provision } = useMux();
  const { cameraDevices, microphoneDevices, activeCamera, activeMicrophone, requestPermissionAndGetLocalMedia } = useDevices();

  React.useEffect(() => {
    if(!cameraDeviceIndex && !microphoneDeviceIndex) return;

    const microphoneDevice = microphoneDeviceIndex && microphoneDevices[microphoneDeviceIndex];
    const cameraDevice = cameraDeviceIndex && cameraDevices[cameraDeviceIndex];

    requestPermissionAndGetLocalMedia(microphoneDevice ? microphoneDevice?.deviceId : '', cameraDevice ? cameraDevice?.deviceId : '');
  }, [microphoneDeviceIndex, cameraDeviceIndex]);

  React.useEffect(() => {
    session && onJoin();
  }, [session]);

  const handleOnMicrophonehange:InputSelectChangeHandler<number> = async (index) => setMicrophoneDeviceIndex(index);
  const handleOnCameraChange:InputSelectChangeHandler<number> = async (index) => setCameraDeviceIndex(index);

  const handleOnJoin = () => provision();

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.preview}>
          <Video />
        </div>
        <div className={styles.form}>
          <div>
            <InputSelect
              label="Microphone"
              Icon={MicOnIcon}
              items={microphoneDevices}
              normalizeItems={normalizeItems} 
              onChange={handleOnMicrophonehange}
            />
            <InputSelect
              label="Video"
              Icon={VideoOnIcon}
              items={cameraDevices}
              normalizeItems={normalizeItems} 
              onChange={handleOnCameraChange}
            />
          </div>
          <Button text="Join Snitch Studio" disabled={!activeMicrophone && !activeCamera} onClick={handleOnJoin} />
        </div>
      </div>
    </div>
  );
};

export default Parlour;
