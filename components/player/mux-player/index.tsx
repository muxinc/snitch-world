import React from 'react';
import MuxVideo from '@mux-elements/mux-video-react';
import { 
  MediaControlBar,
  MediaController,
  MediaFullscreenButton,
  MediaMuteButton,
  MediaPipButton,
  MediaPlayButton,
  MediaTimeRange,
  MediaVolumeRange
} from 'media-chrome/dist/react';

import styles from './index.module.css';
import EmojiMediaChromeControl from './emoji-media-chrome-control';

interface Props {
  channel: string;
}

const Player = (props: Props) => {
  const { channel } = props;

  return (
    <MediaController className={styles.video} autohide="-1">
      <MuxVideo
        playbackId="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
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
      <MediaControlBar>
        <MediaPlayButton />
        <MediaMuteButton />
        <MediaVolumeRange />
        <MediaTimeRange />
        <MediaPipButton />
        <MediaFullscreenButton />
        <EmojiMediaChromeControl channel={channel} />
      </MediaControlBar>
    </MediaController>
  );
};

export default Player;
