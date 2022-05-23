import React from 'react';

import style from './index.module.scss';

interface Props {
  text: string;
  type?: 'button' | 'reset' | 'submit';
  small?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

const Button = (props:Props) => {
  const {
    text,
    type = 'button',
    disabled,
    small,
    onClick
  } = props;

  return (
    <button 
      className={`${style.button} ${small && style.smol}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
