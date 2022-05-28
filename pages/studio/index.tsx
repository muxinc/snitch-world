import React from 'react';
import Head from 'next/head';
import { createStudio } from '@mux/studio-embed';

import StudioManage from '@/components/studio-manage';
import { StatCounts } from '@/types/mux';
import ContextProvider from 'context/';
import style from './index.module.css';

const Studio = () => {
  const studioRef = React.useRef<HTMLIFrameElement>(null);
  const timerRef = React.useRef<NodeJS.Timer>();

  const [studioContext, setStudioContext] = React.useState<any>();
  const [studio, setStudio] = React.useState<any>(undefined);
  const [statCounts, setStatCounts] = React.useState<StatCounts>();

  const handleOnInterval = async () => {
    const { playbackId } = studioContext;
    const response = await fetch(`./api/get-stat-counts?playbackId=${playbackId}`);
    const json = await response.json();

    setStatCounts(json.statCounts[0]);
  };

  const getStudioContext = async () => {
    const response = await fetch('./api/get-studio-token');
    return await response.json();
  }

  const init = async () => {
    const studioContext = await getStudioContext();

    setStudioContext(studioContext);
  }

  React.useEffect(() => {
    init();

    return () => {
      // HACK - This is dumb.
      clearInterval(timerRef.current as NodeJS.Timeout);
    };
  }, []);

  React.useEffect(() => {
    // If no token is available or if studio is already set
    if(!studioContext || studio) return;

    try {
      createStudio(studioContext.token, studioRef.current!, { autoSize: false })
        .then((studio:any) => {
          setStudio(studio);
          timerRef.current = setInterval(handleOnInterval, 10000);
        });
    } catch(err) { console.error(err); }
  }, [studioContext]);

  // TODO - Need to implement user activated livstream/studio delete
  const handleOnLiveStreamEnded = (t: any, t2:any, t3: any) => {

  };

  React.useEffect(() => {
    if(!studio) return;

    studio.on('LIVESTREAM_ENDED', handleOnLiveStreamEnded);

    return () => studio.off('LIVESTREAM_ENDED', handleOnLiveStreamEnded);
  }, [studio]);

  if(!studioContext) return null;

  return (
    <>
      <Head>
        <title>Snitch - Studio</title>
      </Head>
      <div className={style.container}>
        <div className={style.studioContainer}>
          <div ref={studioRef} className={style.studio} />
        </div>
        <ContextProvider publishId={studioContext.playbackId} uuid="Content creator">
          <div className={style.studioManageContainer}>
            { studioContext &&
              <StudioManage publishId={studioContext.playbackId} statCounts={statCounts} />
            }
          </div>
        </ContextProvider>
      </div>
    </>
  );
};

export default Studio;
