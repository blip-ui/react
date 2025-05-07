import React from 'react';

import './BlipInput.scss';
import clsx from 'clsx';

export const BlipInput = (props: any) => {
  return (
    <div className={ clsx(
      'BlipInput-container',
      'BlipInput-size-' + ( props?.size ?? 'auto' ),
    ) }>
      <input className="BlipInput-input" { ...props } />
    </div>
  );
};
