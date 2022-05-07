import Footer from '@/components/footer';
import Header from '@/components/header';
import React from 'react';

import styles from './index.module.scss';

const LayoutDefault = (props:React.PropsWithChildren<{}>) => {
  const { children } = props;

  return (
    <>
      <div className={styles.main}>
        <Header />
        <div className={styles.body}>
          {children}
        </div>
        <Footer />
      </div>
      <style jsx global>{`
        body {
          background: url(./purple.png) no-repeat center center;
          background-size: cover;
          background-attachment: fixed;
          background-size: cover;
        }
      `}</style>
    </>
  );
};

export default LayoutDefault;
