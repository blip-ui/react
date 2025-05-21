import React from 'react';

import './BlipModal.scss';
import clsx from 'clsx';
import { BlipButton } from '../BlipButton/BlipButton';

export const BlipModal = (props: any) => {

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

  if (!props?.show) { return null; }

  return (
    <div className={ clsx(
      'BlipModal',
      props?.className
    ) }>
      <div onClick={ handleBackdropClick } className="BlipModal__backdrop"/>
      <div className="BlipModal__wrapper">
        <div className="BlipModal__content__frame">
          { props?.title ? <div className="BlipModal__title">{ props?.title }</div> : null }
          <div className="BlipModal__content">
            { props?.children }
          </div>
          { props?.actions && props?.actions?.length
            ?
            <div className="BlipModal__actions">
              { ( props?.actions ?? [] ).includes('close')
                ? <BlipButton onClick={ handleActionClick('close') } label={ 'Close' }/>
                : null }
            </div>
            : null }
        </div>
      </div>
    </div>
  );
};
