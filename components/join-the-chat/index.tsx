import usePubnubManager from '@/hooks/use-pubnub-manager';
import React from 'react';

import style from './index.module.css';

const JoinTheChat = () => {
  const [isSignedIn, setIsSignedIn] = React.useState<boolean>(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const { uuid, updateUuid } = usePubnubManager();
  
  React.useEffect(() => {
    setIsSignedIn(uuid !== 'anonymous');
  }, []);
  
  const handleOnClick = () => updateUuid(inputRef.current?.value as string);

  if(isSignedIn) return null;

  return (
    <div className={style.container}>
      <div>
        <h1>Join the chat</h1>
        <h4>Your name</h4>
        <input type="text" ref={inputRef} />
        <button onClick={handleOnClick}>Submit</button>
      </div>
    </div>
  );
};

export default JoinTheChat;
