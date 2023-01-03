import React from 'react';
import { LocalParticipant, LocalTrack, Space } from '@mux/spaces-web';

import ContextProvider from '@/context/index';
import StudioManage from '@/components/studio-manage';
import Button from '@/components/button-studio';
import usePreventUnload from '@/hooks/use-prevent-unload';
import MicOnIcon from '@/public/icons/mic-on.svg';
import MicOffIcon from '@/public/icons/mic-off.svg';
import VideoOnIcon from '@/public/icons/video-on.svg';
import VideoOffIcon from '@/public/icons/video-off.svg';
import SettingsIcon from '@/public/icons/settings.svg';
import ModalStudio from '@/components/modal-studio';

import styles from './index.module.scss';
import Video from './../video';
import { useDevices } from '../hooks/use-devices';
import { useMux } from '../hooks/use-mux';
import Settings from '../settings';

const Studio = () => {
  const [isBroadcasting, setIsBroadcast] = React.useState<boolean>(false);
  const [isBroadcastEnded, setIsBroadcastEnded] = React.useState<boolean>(false);
  const [isAudioOn, setIsAudioOn] = React.useState<boolean>(true);
  const [isVideoOn, setIsVideoOn] = React.useState<boolean>(true);
  const [audioTrack, setAudioTrack] = React.useState<LocalTrack>();
  const [videoTrack, setVideoTrack] = React.useState<LocalTrack>();
  const [isEndBroadcastModalOpen, setIsEndBroadcastModalOpen] = React.useState<boolean>(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = React.useState<boolean>(false);

  const spaceRef = React.useRef<Space>();
  const localParticipantRef = React.useRef<LocalParticipant>();

  const { session, startBroadcast, stopBroadcast } = useMux();
  const { activeMicrophone, activeCamera, getCameraDevice, getMicrophoneDevice } = useDevices();

  usePreventUnload();

  const publishTracks = async (tracks:LocalTrack[]) => await localParticipantRef.current?.publishTracks(tracks);

  const initializeSpace = async () => {
    localParticipantRef.current = await spaceRef.current?.join();

    const promises = [];

    if(activeMicrophone?.deviceId) {
      promises.push(getMicrophoneDevice(activeMicrophone?.deviceId));
    }

    if(activeCamera?.deviceId) {
      promises.push(getCameraDevice(activeCamera?.deviceId));
    }

    Promise.all(promises).then((([[audioTrack], [videoTrack]]) => {
      audioTrack && setAudioTrack(audioTrack);
      videoTrack && setVideoTrack(videoTrack);

      publishTracks([audioTrack, videoTrack]);
    }));
  };

  React.useEffect(() => {
    if(spaceRef.current) return;
    const space = new Space(session.jwt);
    spaceRef.current = space;

    initializeSpace();
  }, []);

  React.useEffect(() => {
    if(activeMicrophone?.deviceId === audioTrack?.deviceId) return;
    if(!audioTrack || !activeMicrophone?.deviceId) return;

    audioTrack && localParticipantRef.current?.unpublishTracks([audioTrack]);
    audioTrack.stop();

    getMicrophoneDevice(activeMicrophone.deviceId).then(([audioLocalTrack]) => {
      publishTracks([audioLocalTrack]);

      setAudioTrack(audioLocalTrack);
    });
  }, [activeMicrophone]);

  React.useEffect(() => {
    if(activeCamera?.deviceId === videoTrack?.deviceId) return;
    if(!videoTrack || !activeCamera?.deviceId) return;
    
    videoTrack && localParticipantRef.current?.unpublishTracks([videoTrack]);

    if(isVideoOn) {
      getCameraDevice(activeCamera?.deviceId).then(([videoLocalTrack]) => {
        publishTracks([videoLocalTrack]);

        setVideoTrack(videoLocalTrack);
      });
    }
  }, [activeCamera]);

  const handleOnBroadcastState = async () => {
    if(isBroadcasting) {
      setIsEndBroadcastModalOpen(true);
    } else {
      await startBroadcast();
      setIsBroadcast(true);
    }
  };

  const handleOnConfirmEndBroadcast = async () => {
    await stopBroadcast();
    setIsBroadcast(false);
    setIsEndBroadcastModalOpen(false);
    setIsBroadcastEnded(true);
  }

  const handleOnSettings = () => setIsSettingsModalOpen(true);
  
  const handleOnConfirmSettings = () => {
    setIsSettingsModalOpen(false);
  };

  const handleOnToggleMute = () => {
    isAudioOn ? audioTrack?.mute() : audioTrack?.unMute();

    setIsAudioOn(prev => !prev);
  };
  
  const handleOnToggleVideo = async () => {
    if(isVideoOn && videoTrack) {
      localParticipantRef.current?.unpublishTracks([videoTrack]);
    } else if(!isVideoOn && activeCamera?.deviceId) {
      const [videoTrack] = await getCameraDevice(activeCamera?.deviceId);
      videoTrack && await publishTracks([videoTrack]);

      setVideoTrack(videoTrack);
    }

    setIsVideoOn(prev => !prev);
  };

  return (
    <ContextProvider publishId={session.playbackId} uuid="Content creator">
      <div className={styles.container}>
        <div className={styles.topControls}>
          <Button
            text={isBroadcasting ? 'Stop broadcast' : 'Start broadcast'}
            theme='bright'
            title={isBroadcastEnded ? 'Refresh your browser to restart your session' : ''}
            disabled={isBroadcastEnded}
            onClick={handleOnBroadcastState}
          />
        </div>
        <Video enableVideo={isVideoOn} />
        <div className={styles.bottomControls}>
          <button className={`${styles.control} ${!isAudioOn && styles.controlDisabled}`} onClick={handleOnToggleMute}>
            { isAudioOn ? <MicOnIcon width={18} /> : <MicOffIcon width={18} /> }
            <span>{ isAudioOn ? "Mute" : "Unmute" }</span>
          </button>
          <button className={`${styles.control} ${!isVideoOn && styles.controlDisabled}`} onClick={handleOnToggleVideo}>
            { isVideoOn ? <VideoOnIcon width={18} /> : <VideoOffIcon width={18} /> }
            <span>{ isVideoOn ? "Video off" : "Video on" }</span>
          </button>
          <button className={styles.control} onClick={handleOnSettings}>
            <SettingsIcon width={18} fill="#fff" />
            <span>Settings</span>
          </button>
        </div>
      </div>
    
      <div className={styles.studioManageContainer}>
        { session &&
          <StudioManage publishId={session.playbackId} />
        }
      </div>
      <ModalStudio headerText="Are you sure?" open={isEndBroadcastModalOpen} onSubmit={handleOnConfirmEndBroadcast}>
        <p>Stopping the broadcast will end the livestream.  You will not be able to restart it unless you refresh your browser.</p>
      </ModalStudio>
      <ModalStudio headerText="Settings" open={isSettingsModalOpen} onSubmit={handleOnConfirmSettings}>
        <Settings />
      </ModalStudio>
    </ContextProvider>
  );
};

export default Studio;
