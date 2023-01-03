import React from 'react';

import styles from './index.module.scss';

type Theme = 'dark' | 'bright';

interface Props {
  text: string;
  title?: string;
  type?: 'button' | 'reset' | 'submit';
  theme?: Theme;
  disabled?: boolean;
  onClick?: () => void;
}

const resolveTheme = (theme:Theme) => {
  if(theme === 'dark') {
    return styles.dark;
  }
  else if(theme === 'bright') {
    return styles.bright;
  }
  else {
    return styles.dark;
  }
};

const Button = (props: Props) => {
  const {
    text,
    title,
    type = 'button',
    theme = 'dark',
    disabled,
    onClick
  } = props;

  return (
    <button
      className={`${styles.button} ${resolveTheme(theme)}`}
      type={type}
      disabled={disabled}
      title={title}
      onClick={onClick}
    >
      {text}
    </button>
  )
};

export default Button;
