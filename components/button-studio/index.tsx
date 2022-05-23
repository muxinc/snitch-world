import React from 'react';

import style from './index.module.scss';

interface Props {
  text: string;
  type?: 'button' | 'reset' | 'submit';
  disabled?: boolean;
  onClick?: () => void;
}

const Button = (props: Props) => {
  const {
    text,
    type = 'button',
    disabled,
    onClick
  } = props;

  return (
    <button
      className={style.button}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  )
};

export default Button;
