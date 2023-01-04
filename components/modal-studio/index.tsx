import React from 'react';
import { Portal } from 'react-portal';

import Button from '@/components/button-studio';

import style from './index.module.scss';

interface Props {
  headerText: string;
  open: boolean;
  width?: number;
  disableSubmit?: boolean;
  submitButtonText?: string;
  onSubmit: () => void;
  onCancel?: () => void;
}

const ModalStudio = (props: React.PropsWithChildren<Props>) => {
  const { headerText, open, width, disableSubmit, submitButtonText = 'Submit', children, onSubmit, onCancel } = props;

  if(!open) return null;

  return (
    <Portal>
      <div className={style.wrapper}>
        <div className={style.container} style={{ width }}>
          <h1 className={style.header}>{headerText}</h1>
          <div className={style.body}>
            {children}
          </div>
          <div className={style.footer}>
            {onCancel && <Button text="Cancel" onClick={onCancel} /> }
            <Button text={submitButtonText} disabled={disableSubmit} onClick={onSubmit} />
          </div>
        </div>
        <div className={style.overlay} />
      </div>
    </Portal>
  );
};

export default ModalStudio;
