import React from 'react';

import style from './index.module.scss';

const CoolBox = (props:React.PropsWithChildren<{}>) => {
  const { children } = props;

  return (
    <div className={style.container}>
      <div className={style.body}>
        {children}
      </div>
    </div>
  ); 
};

export default CoolBox;
