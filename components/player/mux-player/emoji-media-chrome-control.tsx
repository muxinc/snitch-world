import React from 'react';
import Image from 'next/image';
import { usePubNub } from 'pubnub-react';

import { ReactionArray } from '@/context/types';
import styles from './emoji-media-chrome-control.module.css';

interface Props {
  channel: string;
}

const EmojiMediaChromeControl = (props: Props) => {
  const { channel } = props;

  const [showReactions, setShowReactions] = React.useState(false);
  const pubnub = usePubNub();

  const toggleShowReactions = () => setShowReactions((prev) => !prev);

  const reactionThunk = (reaction:string) => {
    return () => {
      pubnub.publish({
        channel: `${channel}-reactions`,
        message: { reaction }
      });

      setShowReactions(false);
    }
  };

  const reactions = ReactionArray.map(reaction => (
    <li key={reaction}><button onClick={reactionThunk(reaction)}>{reaction}</button></li>
  ));

  return (
    <div className={styles.reactionsContainer}>
      { showReactions &&
        (
          <div className={styles.reactionsWrapper}>
            <ul className={styles.reactionList}>
              {reactions}
            </ul>
          </div>
        )
      }
      <button className={styles.controlContainer} onClick={toggleShowReactions}>
        <Image src="/emoji.svg" width="24" height="24" />
      </button>
    </div>
  );
};

export default EmojiMediaChromeControl;
