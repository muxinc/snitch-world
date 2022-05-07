import Link from 'next/link';
import React from 'react';

import style from './index.module.scss';

const Footer = () => {
  return (
    <footer className={style.container}>
      <span>&copy;{new Date().getFullYear()} Mux Inc</span>
      <Link href="./tos">Terms of Service</Link>
    </footer>
  );
};

export default Footer;
