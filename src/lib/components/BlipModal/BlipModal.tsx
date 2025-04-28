import React from 'react';

import './BlipModal.scss';
import clsx from 'clsx';
import { BlipButton } from '@/lib';

const BlipModal = (props: any) => {

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (props?.onClose) {
      props.onClose('backdrop');
    }
  };

  const handleActionClick = (action: string) => () => {
    if (action === 'close') {
      if (props?.onClose) {
        props?.onClose('close');
      }
    } else {
      if (props?.onActionClick) {
        props.onActionClick(action);
      }
    }
  };

  return (
    <div className={ clsx(
      `BlipModal-container 
      ${ props?.show ? 'BlipModal-container-show' : 'BlipModal-inert' }`
    ) }>
      <div onClick={ handleBackdropClick } className="BlipModal-backdrop"/>
      <div className="BlipModal-content-wrapper">
        <div className="BlipModal-content-frame">
          <div className="BlipModal-content">
            { props.children }
          </div>
          { props?.actions && props?.actions?.length
            ?
            <div className="BlipModal-actions">
              { ( props?.actions ?? [] ).includes('close')
                ? <BlipButton onClick={ handleActionClick('close') } label={ 'Close' } />
                : null }
            </div>
            : null }
        </div>
      </div>
    </div>
  );
};

export default BlipModal;
