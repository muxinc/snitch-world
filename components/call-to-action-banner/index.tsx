import React from 'react';

import style from './index.module.scss';

interface CtaMetadata {
  url: string;
  title: string;
  description: string;
  image: string;
}

interface Props {
  metadata?: CtaMetadata;
}

const CallToActionBanner = (props: Props) => {
  const { metadata } = props;

  // Used to decode strings that have html entity encoded values
  const decodeHtmlEntities = (text: string) => {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = text;

    return textarea.value;
  }

  React.useEffect(() => {

  }, [metadata]);

  const titleClean = metadata && decodeHtmlEntities(metadata.title);
  const descriptionClean = metadata && decodeHtmlEntities(metadata.description);

  return (
    // <div className={`${style.container} ${metadata && style.show}`}>
    <a className={`${style.container} ${metadata && style.show}`} href={metadata && metadata.url} rel="noopener noreferrer" target="_blank">
      <div>
        <div className={style.image} style={{ backgroundImage: `url("${metadata && metadata.image}")`}} />
      </div>
      <div className={style.textContainer}>
        <div className={style.title} title={titleClean}>{titleClean}</div>
        <div className={style.description} title={descriptionClean}>{descriptionClean}</div>
      </div>
      <div className={style.go}>
        {/* <a href={metadata && metadata.url} rel="noopener noreferrer" target="_blank"> */}
          <svg width="21" height="33" viewBox="0 0 21 33" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.2396 26.5395V20.1395H7.57292V26.5395H14.2396ZM0.90625 26.5395V32.9395H7.57292V26.5395H0.90625ZM7.57292 13.7395H14.2396V7.33945H7.57292V13.7395ZM20.9062 13.7395H14.2396V20.1395H20.9062V13.7395ZM7.57292 7.33945V0.939453H0.90625V7.33945H7.57292Z" fill="white"/>
          </svg>
        {/* </a> */}
      </div>
    </a>
  );
};

export default CallToActionBanner;
