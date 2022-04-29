import React from 'react';
import Head from 'next/head';
import Pubnub from 'pubnub';
import { PubNubProvider } from 'pubnub-react';
import studioEmbed from '@mux/studio-embed';

import StudioManage from '@/containers/studio-manage';
import { StatCounts } from '@/types/mux';
import style from './index.module.css';

const Studio = () => {
  const studioRef = React.useRef<HTMLIFrameElement>(null);
  const timerRef = React.useRef<NodeJS.Timer>();

  const [studioContext, setStudioContext] = React.useState<any>();
  const [studio, setStudio] = React.useState<any>(undefined);
  const [statCounts, setStatCounts] = React.useState<StatCounts>();

  // HACK - Full perms, should be scoped (post-TMI?)
  const client = new Pubnub({
    publishKey: process.env.NEXT_PUBLIC_PUBNUB_PUBLISH_KEY,
    subscribeKey: process.env.NEXT_PUBLIC_PUBNUB_SUBSCRIBER_KEY!,
    uuid: 'Content creator',
  });

  const handleOnInterval = async () => {
    const { playbackId } = studioContext;
    const response = await fetch(`./api/get-stat-counts?playbackId=${playbackId}`);
    const json = await response.json();

    setStatCounts(json.statCounts[0]);
    console.log(json);
  };

  React.useEffect(() => {
    fetch('./api/get-studio-token')
      .then((result) => result.json())
      .then((context) => setStudioContext(context));

      return () => {
        // HACK - This is dumb.
        clearInterval(timerRef.current as NodeJS.Timeout);
      };
  }, []);

  React.useEffect(() => {
    // If no token is available or if studio is already set
    if(!studioContext || studio) return;

    try {
      studioEmbed.init(studioContext.token, studioRef.current, { autoSize: false })
        .then((studio:any) => {
          setStudio(studio);
          timerRef.current = setInterval(handleOnInterval, 10000);
        });
    } catch(err) { console.log(err); }
  }, [studioContext]);

  // TODO - Need to implement user activated livstream/studio delete
  const handleOnLiveStreamEnded = (t: any, t2:any, t3: any) => {

  };

  React.useEffect(() => {
    if(!studio) return;

    studio.on('LIVESTREAM_ENDED', handleOnLiveStreamEnded);

    return () => studio.off('LIVESTREAM_ENDED', handleOnLiveStreamEnded);
  }, [studio]);

  return (
    <PubNubProvider client={client}>
      <Head>
        <title>Snitch - Studio</title>
        {/* TODO - We should probably bring these fonts local to the project */}
        <link href="https://static.mux.com/fonts/fonts.css" rel="stylesheet" key="test"/>
      </Head>
      <div className={style.container}>
        <div className={style.studioContainer}>
          <div ref={studioRef} className={style.studio} />
        </div>
        <div className={style.studioManageContainer}>
          { studioContext &&
            <StudioManage publishId={studioContext.playbackId} statCounts={statCounts} />
          }
        </div>
      </div>
    </PubNubProvider>
  );
};

export default Studio;
