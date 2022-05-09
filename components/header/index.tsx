import React from 'react';

import style from './index.module.scss';

interface Props {
  hideLogo?: boolean;
}

const Header = (props:Props) => {
  const { hideLogo } = props;
  return (
    <header className={style.container}>
      <div
        className={style.logo}
        style={{ visibility: hideLogo ? 'hidden' : 'initial' }}
      >
        Snitch
      </div>
      <div className={style.about}>
        <span>ABOUT :</span>
        <a
          href='https://mux.com/blog/phoenix-liveview-build-twitch-without-writing-javascript'
        >
          Read the blog post
        </a>
      </div>
    </header>
  );
};

export default Header;
