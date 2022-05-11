import React from 'react';

import Footer from '@/components/footer';
import style from './index.module.scss';

interface Props {
  hideLogo?: boolean;
}

const BLOG_POST_URL = 'https://mux.com/blog/phoenix-liveview-build-twitch-without-writing-javascript';

const Header = (props:Props) => {
  const { hideLogo } = props;

  const [mobilePopoverShown, setMobilePopoverShown] = React.useState(false);

  const handleMobilePopoverControlClick = () => setMobilePopoverShown((prev) => !prev);

  return (
    <>
      <header className={style.container}>
        <div
          className={style.logo}
          style={{ visibility: hideLogo ? 'hidden' : 'initial' }}
        >
          Snitch
        </div>
        <div className={style.about}>
          <span>ABOUT:</span>
          <a href={BLOG_POST_URL}>
            Read the blog post
          </a>
        </div>
        <div className={style.mobilePopoverControl}>
          <button onClick={handleMobilePopoverControlClick}>
            {
              mobilePopoverShown ?
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.27156 25.3134C0.880707 25.7043 0.880717 26.3368 1.27156 26.7276C1.6624 27.1185 2.29493 27.1185 2.68577 26.7276L26.7274 2.68598C27.1183 2.29513 27.1182 1.66261 26.7274 1.27177C26.3366 0.880928 25.704 0.880929 25.3132 1.27177L1.27156 25.3134Z" fill="white"/>
                <path d="M1.27141 1.27254C1.66225 0.881694 2.29477 0.881683 2.68562 1.27254L26.7273 25.3142C27.1181 25.705 27.1181 26.3375 26.7273 26.7284C26.3364 27.1192 25.7039 27.1192 25.313 26.7284L1.27141 2.68675C0.880566 2.29591 0.880566 1.66338 1.27141 1.27254Z" fill="white"/>
              </svg>:
              <svg width="36" height="26" viewBox="0 0 36 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 0C0.44725 0 0 0.447265 0 1C0 1.55273 0.447265 2 1 2H35C35.5527 2 36 1.55273 36 1C36 0.447265 35.5527 0 35 0H1ZM1 12C0.44725 12 0 12.4473 0 13C0 13.5527 0.447265 14 1 14H35C35.5527 14 36 13.5527 36 13C36 12.4473 35.5527 12 35 12H1ZM1 24C0.44725 24 0 24.4473 0 25C0 25.5527 0.447265 26 1 26H35C35.5527 26 36 25.5527 36 25C36 24.4473 35.5527 24 35 24H1Z" fill="white"/>
              </svg>
            }
          </button>
        </div>
      </header>
      { 
        mobilePopoverShown &&
        <div className={style.mobilePopover}>
          <div className={style.mobilePopoverBody}>
            <div className={style.about}>
              <span>ABOUT SNITCH:</span>
              <a href={BLOG_POST_URL}>
                Read the blog post
              </a>
            </div>
            <div className={style.mobilePopoverFooter}>
              <Footer />
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default Header;
