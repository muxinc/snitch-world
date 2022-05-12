import React from 'react';
import MuxVideo from '@mux-elements/mux-video-react';
import { 
  MediaControlBar,
  MediaController,
  MediaFullscreenButton,
  MediaMuteButton,
  MediaPlayButton,
  MediaTimeRange,
  MediaVolumeRange
} from 'media-chrome/dist/react';

import StreamerIsCurrentlyOffline from '@/components/streamer-is-currently-offline';
import EmojiMediaChromeControl from '@/components/player/mux-player/emoji-media-chrome-control';
import styles from './index.module.scss';
import usePubnubManager from '@/hooks/use-pubnub-manager';
import Pubnub from 'pubnub';
import { LivestreamStateEnum } from '@/context/types';

interface Props {
  publishId: string;
}

const Player = (props: Props) => {
  const { publishId } = props;

  const [streamState, setStreamState] = React.useState<boolean|undefined>(undefined);

  const { addSignalListener } = usePubnubManager();

  const handleSignal = (signal:Pubnub.SignalEvent) => {
    const { state } = signal.message;
    console.log(signal.message);
    setStreamState(state !== LivestreamStateEnum.active);
  };

  const checkStreamState = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_MUX_STREAM_BASE_URL}/${publishId}.m3u8`);

    const isOnline = response.status === 200;
    
    setStreamState(isOnline);

    addSignalListener(handleSignal);
  };

  React.useEffect(() => {
    if(!publishId) return;

    checkStreamState();
  }, [publishId]);

  if(!publishId || streamState === undefined) return null;

  if(!streamState) {
    return (<StreamerIsCurrentlyOffline />);
  }

  return (
    <>
      <MediaController className={styles.video} autohide="-1">
        <MuxVideo
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
        />
        <MediaControlBar className={styles.mediaControlBar}>
          <MediaPlayButton />
          <MediaMuteButton />
          <MediaVolumeRange />
          <MediaTimeRange />
          <MediaFullscreenButton />
          <EmojiMediaChromeControl channel={publishId} />
        </MediaControlBar>
      </MediaController>
    </>
  );
};

export default Player;
