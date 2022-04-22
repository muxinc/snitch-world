import React from 'react';

import styles from './index.module.css';

const LayoutWatch = (props: React.PropsWithChildren<React.ReactNode>) => {
  const { children } = props;

  return (
    <div className={styles.main}>
      <header>header</header>
      <div className={styles.body}>
        {children}
      </div>
      <footer>footer</footer>
    </div>
  );
};

export default LayoutWatch;
