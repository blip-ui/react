import React from 'react';

import './BlipInput.scss';
import clsx from 'clsx';

const BlipInput = (props: any) => {
  return (
    <div className={ clsx(
      'BlipInput-container',
      'BlipInput-size-' + ( props?.size ?? 'auto' ),
    ) }>
      <input { ...props } />
    </div>
  );
};

export default BlipInput;