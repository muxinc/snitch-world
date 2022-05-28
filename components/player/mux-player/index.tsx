import React from 'react';
import Pubnub from 'pubnub';
import MuxVideo from '@mux-elements/mux-video-react';
import { initialize, setupAutoplay, generatePlayerInitTime, MuxMediaPropsInternal, PlaybackEngine } from '@mux-elements/playback-core';
import { 
  MediaControlBar,
  MediaController,
  MediaMuteButton,
  MediaPlayButton,
  MediaVolumeRange
} from 'media-chrome/dist/react';

import usePubnubManager from '@/hooks/use-pubnub-manager';
import StreamerIsCurrentlyOffline from '@/components/streamer-is-currently-offline';
import EmojiMediaChromeControl from '@/components/player/mux-player/emoji-media-chrome-control';
import { LivestreamStateEnum } from '@/context/types';
import CallToActionBanner from '@/components/call-to-action-banner';
import styles from './index.module.scss';
import pkg from './../../../package.json';

const playerSoftwareVersion = pkg.version;
const playerSoftwareName = 'snitch-world';

interface Props {
  publishId: string;
}

const Player = (props: Props) => {
  const { publishId } = props;

  const [streamState, setStreamState] = React.useState<boolean|undefined>(undefined);
  const [isReady, setIsReady] = React.useState<boolean>(false);
  const [ctaMeta, setCtaMeta] = React.useState(undefined);
  const [playerInitTime] = React.useState(generatePlayerInitTime());

  const videoRef = React.useRef<HTMLVideoElement>(null);
  const playbackEngineRef = React.useRef<PlaybackEngine | undefined>(undefined);
  const ctaTimeout = React.useRef<NodeJS.Timeout>();

  const { addMessageListener, addSignalListener } = usePubnubManager();

  const handleMessage = (message: Pubnub.MessageEvent) => {
    if(ctaTimeout.current) {
      clearTimeout(ctaTimeout.current);
    }

    setCtaMeta(message.message.cta);

    ctaTimeout.current = setTimeout(() => setCtaMeta(undefined), 15000);
  };

  const handleSignal = (signal:Pubnub.SignalEvent) => {
    const { state } = signal.message;
    setStreamState(state === LivestreamStateEnum.active);
  };

  const checkStreamState = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_MUX_STREAM_BASE_URL}/${publishId}.m3u8`);

    const isOnline = response.status === 200;
    
    setStreamState(isOnline);

    addMessageListener(handleMessage);
    addSignalListener(handleSignal);
  };

  React.useEffect(() => {
    if(!publishId) return;

    checkStreamState();
  }, [publishId]);

  React.useEffect(() => {
    if(!isReady) return;

    const propsWithState:Partial<MuxMediaPropsInternal> = {
      src: `${process.env.NEXT_PUBLIC_MUX_STREAM_BASE_URL}/${publishId}.m3u8`,
      envKey: process.env.NEXT_PUBLIC_MUX_ENV_KEY,
      beaconCollectionDomain: process.env.NEXT_PUBLIC_MUX_LITIX_DOMAIN,
      playerInitTime,
      playerSoftwareName,
      playerSoftwareVersion,
      streamType: 'll-live',
      preferMse: true,
      autoplay: true,
      metadata: {
        video_id: 'video-id-123456',
        video_title: 'Super Interesting Video',
        viewer_user_id: 'user-id-bc-789',
      }
    };

    initialize(propsWithState, videoRef.current);

    playbackEngineRef.current = initialize(propsWithState, videoRef.current);
    // setupAutoplay(videoRef.current!, true, playbackEngineRef.current)(true);
  }, [isReady]);

  if(!publishId || streamState === undefined) return null;

  if(!streamState) {
    return (<StreamerIsCurrentlyOffline />);
  }

  return (
    <>
      <MediaController className={styles.video} autohide="-1">
        <video ref={videoRef} playsInline muted onCanPlay={() => setIsReady(true)} onEnded={() => setStreamState(false)} />
        {/* <MuxVideo
          src={`${process.env.NEXT_PUBLIC_MUX_STREAM_BASE_URL}/${publishId}.m3u8`}
          envKey={process.env.NEXT_PUBLIC_MUX_ENV_KEY}
          beaconCollectionDomain={process.env.NEXT_PUBLIC_MUX_LITIX_DOMAIN}
          metadata={{
            video_id: 'video-id-123456',
            video_title: 'Super Interesting Video',
            viewer_user_id: 'user-id-bc-789',
          }}
          streamType="on-demand"
          slot="media"
          preferMse
          autoPlay
          muted
          playsInline
          onEnded={() => setStreamState(false)}
        /> */}
        <MediaControlBar className={styles.mediaControlBar}>
          <MediaPlayButton />
          <div className={styles.spacer} />
          <MediaMuteButton />
          <MediaVolumeRange />
          <EmojiMediaChromeControl channel={publishId} />
        </MediaControlBar>
        <CallToActionBanner metadata={ctaMeta} />
      </MediaController>
    </>
  );
};

export default Player;
