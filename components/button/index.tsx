import React from 'react';

import style from './index.module.scss';

interface Props {
  text: string;
  onClick?: () => void;
}

const Button = (props:Props) => {
  const { text, onClick = () => undefined } = props;

  return (
    <button className={style.button} onClick={onClick}>{text}</button>
  );
};

export default Button;
