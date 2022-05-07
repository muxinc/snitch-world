import React from 'react';
import { useRouter } from 'next/router';

import Button from '@/components/button';
import style from './index.module.scss';

const StartStreamingModal = () => {
  const { push } = useRouter();

  const handleOnClick = () => push('./studio');

  return (
    <div className={style.container}>
      <div className={style.body}>
        <div className={style.header}>
          <div>Snitch</div>
          <div>Start streaming</div>
        </div>
        <div className={style.message}>
          <div>Welcome to Snitch.world,</div>
          <div>where spinning up a video stream is easy as 1 • 2 • 3.</div>
        </div>
        <Button
          text="Go to Content Creator"
          onClick={handleOnClick}
        />
      </div>
    </div>
  );
};

export default StartStreamingModal;
