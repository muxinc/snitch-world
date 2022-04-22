import React from 'react';
import Pubnub from 'pubnub';
import { PubNubProvider } from 'pubnub-react';
import studioEmbed from '@mux/studio-embed';

import StudioManage from '@/containers/studio-manage';
import style from './index.module.css';

const Studio = () => {
  const studioRef = React.useRef<HTMLIFrameElement>(null);
  const [studioToken, setStudioToken] = React.useState();
  const [studio, setStudio] = React.useState<any>(null);

  const client = new Pubnub({
    publishKey: process.env.NEXT_PUBLIC_PUBNUB_PUBLISH_KEY,
    subscribeKey: process.env.NEXT_PUBLIC_PUBNUB_SUBSCRIBER_KEY!,
    uuid: 'userId',
  });

  React.useEffect(() => {
    fetch('./api/get-studio-token')
      .then((result) => result.json())
      .then(({ token }) => setStudioToken(token));
  }, []);

  React.useEffect(() => {
    if(!studioToken) return;

    try {
      studioEmbed.init(studioToken, studioRef.current!)
        .then((studio) => {
          setStudio(studio);
        });
    } catch(err) { console.log(err); }
  }, [studioToken]);

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
      <div className={style.container}>
        <div className={style.studioContainer}>
          <div ref={studioRef} className={style.studio} />
        </div>
        <div className={style.studioManageContainer}>
          <StudioManage publishId='1234' />
        </div>
      </div>
    </PubNubProvider>
  );
};

export default Studio;
