import React from 'react';
import { LocalTrack } from '@mux/spaces-web';

import styles from './index.module.scss';
import { useDevices } from '../hooks/use-devices';

interface Props {
  enableVideo?: boolean;
};

const Video = (props:Props) => {
  const { enableVideo = true } = props;
  const [videoTrack, setVideoTrack] = React.useState<LocalTrack>();

  const videoRef = React.useRef<HTMLVideoElement>(null);

  const { activeCamera, getCameraDevice } = useDevices();

  const detachTrack = React.useCallback((track?:LocalTrack) => videoRef.current && track?.detach(videoRef.current), []);
  const attachTrack = React.useCallback((track?:LocalTrack) => videoRef.current && track?.attach(videoRef.current), []);

  const provisionVideoTrack = async () => {
    if(!activeCamera?.deviceId) return;

    const [videoLocalTrack] = await getCameraDevice(activeCamera?.deviceId);

    videoTrack && detachTrack(videoTrack);

    setVideoTrack(videoLocalTrack);
  };
  
  // For when the activeCamera changes from outside the Video component
  React.useEffect(() => {
    if(videoTrack?.deviceId === activeCamera?.deviceId) return;
    
    provisionVideoTrack();
  }, [activeCamera]);

  // Responsible for attaching the videoTrack when it is changed
  React.useEffect(() => {
    if(!videoTrack) return;

    attachTrack(videoTrack);
  }, [videoTrack]);

  // Whenever the enableVideo is toggled
  React.useEffect(() => {
    if(enableVideo) {
      provisionVideoTrack();
    }
    else {
      detachTrack(videoTrack);
    }
  }, [enableVideo]);

  return (
    <div className={styles.container}>
      <video ref={videoRef} className={styles.video} autoPlay playsInline muted />
    </div>
  );
};

export default Video;
