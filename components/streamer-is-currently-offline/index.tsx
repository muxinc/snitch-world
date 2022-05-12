import React from 'react';

import style from './index.module.scss';

const StreamerIsCurrentlyOffline = () => {
  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <div className={style.hourglass}>
          <div>+====+</div>
          <div>|(::)|</div>
          <div>| )( |</div>
          <div>|(..)|</div>
          <div>+====+</div>
        </div>
        <div>
          <div>STREAMER</div>
          <div>IS CURRENTLY</div>
          <div className={style.offline}>OFFLINE</div>
        </div>
      </div>
    </div>
  );
};

export default StreamerIsCurrentlyOffline;
