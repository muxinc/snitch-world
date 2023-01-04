import React from 'react';

import { useMux } from '@/components/snitch-studio/hooks/use-mux';

import Header from './header';
import styles from './index.module.scss';

const DASHBOARD_BASE_URI = `https://dashboard.mux.com/organizations/${process.env.NEXT_PUBLIC_MUX_ORG_PID}/environments/${process.env.NEXT_PUBLIC_MUX_ENV_PID}`

const Debug = () => {
  const [showDebug, setShowDebug] = React.useState<boolean>(false);

  const { session } = useMux();

  const handleOnHeaderClick = () => setShowDebug(prev => !prev);

  if(!process.env.NEXT_PUBLIC_MUX_ORG_PID || !process.env.NEXT_PUBLIC_MUX_ENV_PID) return null;

  return (
    <div>
      <Header onClick={handleOnHeaderClick} />
      { showDebug &&
        (<div className={styles.container}>
          <div>
            <a href={`${DASHBOARD_BASE_URI}/video/spaces/${session.space.id}`} rel="noopener noreferrer" target="_blank">Mux Space</a>
          </div>
          <div>
            <a href={`${DASHBOARD_BASE_URI}/video/live-streams/${session.livestream.id}`} rel="noopener noreferrer" target="_blank">Mux Livestream</a>
          </div>
        </div>)
      }
    </div>
  );
};

export default Debug;
