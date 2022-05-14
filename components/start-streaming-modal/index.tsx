import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import Button from '@/components/button';
import CoolBox from '@/components/cool-box';
import style from './index.module.scss';
import styleVars from './../../style-vars.module.scss';

const StartStreamingModal = () => {
  const [isPc, setIsPc] = React.useState<boolean>(false);
  const { push } = useRouter();

  const handleOnClick = () => push('./studio');
  const handleMediaQuery = (e:MediaQueryListEvent) => setIsPc(e.matches);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia(`(min-width: ${styleVars.breakpoint_md})`);
    mediaQuery.addEventListener('change', handleMediaQuery);

    setIsPc(mediaQuery.matches);

    return () => mediaQuery.removeEventListener('change', handleMediaQuery);
  }, []);

  return (
    <div className={style.coolBoxContainer}>
      <CoolBox>
        <div className={style.header}>
          <div>
            <Image src='/logo-dark.png' width={149} height={80} />
          </div>
          <div className={style.headerText}>
            <div>Start</div>
            <div>Streaming</div>
          </div>
        </div>
        <div className={style.message}>
          <div>Welcome to Snitch.world,</div>
          <div>where spinning up a video stream is easy as <span className={style.oneTwoThree}>1 • 2 • 3</span>.</div>
        </div>
        <Button
          text="Go to Content Creator"
          onClick={handleOnClick}
          disabled={!isPc}
        />
        { !isPc && (<div className={style.isNotPc}>Please use a desktop/laptop to start a stream.</div>) }
      </CoolBox>
    </div>
  );
};

export default StartStreamingModal;
