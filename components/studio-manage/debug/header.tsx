import React from 'react';

import styles from './index.module.scss';

interface Props {
  onClick?: () => void;
};

const Header = (props:Props) => {
  const { onClick = () => {} } = props;

  return (
    <button className={styles.header} onClick={onClick}>
      <h3>Debug</h3>
    </button>
  );
};

export default Header;
