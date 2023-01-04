import React from 'react';
import { useSession, signIn } from 'next-auth/react';
import Head from 'next/head';

import SnitchStudio from '@/components/snitch-studio';
import { UserMediaProvider } from '@/components/snitch-studio/context/user-media-context';
import { MuxProvider } from '@/components/snitch-studio/context/use-mux';

import styles from './index.module.scss';

interface Props {
  enableOkta: boolean;
};

export async function getStaticProps() {
  const enableOkta = !process.env.OKTA_ENABLE || process.env.OKTA_ENABLE.toLowerCase() === 'true';

  return {
    props: {
      enableOkta
    },
  }
}

const Studio = (props:Props) => {
  const { enableOkta } = props;

  const { status } = useSession();

  if(enableOkta) {
    if (status === 'loading') {
      return (<span>Loading</span>);
    }
    else if (status === 'unauthenticated') {
      signIn();
    }
  }

  return (
    <MuxProvider>
      <UserMediaProvider>
        <Head>
          <title>Snitch - Studio</title>
        </Head>
        <div className={styles.container}>
          <SnitchStudio />
        </div>
      </UserMediaProvider>
    </MuxProvider>
  );
};

export default Studio;
