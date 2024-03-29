import React from 'react';

import Footer from '@/components/footer';
import Header from '@/components/header';

import styles from './index.module.scss';

interface Props {
  hideHeaderLogo?: boolean;
}

const LayoutDefault = (props:React.PropsWithChildren<Props>) => {
  const { hideHeaderLogo, children } = props;

  return (
    <>
      <div className={styles.main}>
        <Header hideLogo={hideHeaderLogo} />
        <div className={styles.body}>
          {children}
        </div>
        <div className={styles.footer}>
          <Footer />
        </div>
      </div>
      <style jsx global>{`
        body {
          background: url(/purple.png) no-repeat center center;
          background-size: cover;
          background-attachment: fixed;
          background-size: cover;
        }
      `}</style>
    </>
  );
};

export default LayoutDefault;
