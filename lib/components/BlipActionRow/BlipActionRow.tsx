import React, { PropsWithChildren } from 'react';

import './BlipActionRow.scss';
import clsx from 'clsx';

export const BlipActionRow: React.FC<any> = (props: PropsWithChildren | any) => {

  const [ error, setError ] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (props?.error) {
      setError(true);
    } else {
      setError(false);
    }
  }, [ props ]);

  return (
    <div className={ clsx(
      'BlipActionRow',
      props?.className
    ) }>
      <div className="BlipActionRow__wrapper">
        <div className={ clsx(
          'BlipActionRow__content',
          props?.progress ? 'BlipActionRow__content--success' : null) }>
          { props?.children ?? null }
        </div>
        <div style={ { width: props?.progress + '%' } }
             className={
               clsx(
                 'BlipActionRow__gradient',
                 error ? 'BlipActionRow__gradient--error' : 'BlipActionRow__gradient--success'
               )
             }>
          <svg viewBox="0 0 500 150" preserveAspectRatio="none">
            <path
              className={ `BlipActionRow__svg__wave-1 ${ error ? 'BlipActionRow__svg__wave-1--error' : 'BlipActionRow__svg__wave-1--success' } waveTop` }
              d="M-8.74,71.55 C289.78,255.11 349.60,4.47 505.36,34.05 L500.00,150.00 L0.00,150.00 Z"
            />
            <path
              className={ `BlipActionRow__svg__wave-2 ${ error ? 'BlipActionRow__svg__wave-2--error' : 'BlipActionRow__svg__wave-2--success' } waveMiddle` }
              d="M-23.42,125.83 C187.63,45.89 299.38,57.73 526.80,123.86 L500.00,150.00 L0.00,150.00 Z"
            />
            <path
              className={ `BlipActionRow__svg__wave-3 ${ error ? 'BlipActionRow__svg__wave-3--error' : 'BlipActionRow__svg__wave-3--success' } waveBottom` }
              d="M-23.42,125.83 C172.96,-152.44 217.55,183.06 504.22,55.77 L500.00,150.00 L0.00,150.00 Z"
            />
          </svg>
          <span>{ props?.status }</span>
        </div>
      </div>
    </div>
  );
};
