import React from 'react';

import Parlour from './parlour';
import Studio from './studio';
import { useDevices } from './hooks/use-devices';

const SnitchStudio = () => {
  const [isReady, setIsReady] = React.useState<boolean>(false);
  const [isJoined, setIsJoined] = React.useState<boolean>(false);

  const { requestPermissionAndGetLocalMedia } = useDevices();

  React.useEffect(() => {
    requestPermissionAndGetLocalMedia('', '').then(() => setIsReady(true));
  }, []);

  const handleOnJoin = () => setIsJoined(true);

  if(!isReady) return null;

  if(!isJoined) return (<Parlour onJoin={handleOnJoin} />);

  return (<Studio />);
};

export default SnitchStudio;
