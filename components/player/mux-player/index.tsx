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

import { ReactionPresenter } from '@/components/reactions';
import styles from './index.module.css';
import EmojiMediaChromeControl from './emoji-media-chrome-control';

interface Props {
  publishId: string;
}

const Player = (props: Props) => {
  const { publishId } = props;

  if(!publishId) return null;

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
