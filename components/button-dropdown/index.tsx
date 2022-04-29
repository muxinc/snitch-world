import React from 'react';

import style from './index.module.css';

const ButtonDropdown = () => {
  return (
    <button className={style.button}>
      <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1L6 5.50148L11 1" stroke="#999999"/>
      </svg>
      &nbsp;
      Action
    </button>
  );
};

export default ButtonDropdown;
