import { Reaction } from '@/services/pubnub/types';
import React from 'react';

import style from './index.module.css';

interface Props {
  emoji: Reaction;
  text?: string;
}

const ReactionPill = (props:Props) => {
  const { emoji, text } = props;
  return (
    <div className={style.pillContainer}>
      <div>{emoji}</div>
      { text?.toString() ?<div>{text}</div> :null }
    </div>
  );
};

export default ReactionPill;
