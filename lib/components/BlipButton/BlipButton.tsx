import './BlipButton.scss';

import React, { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import clsx from 'clsx';

interface BlipButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'auto' | string;
  disableBump?: boolean;
  prefixText?: React.ReactNode;
  suffixText?: React.ReactNode;
  label?: string;
}

export const BlipButton: React.FC<PropsWithChildren<BlipButtonProps>> = (
  {
    size = 'auto',
    disableBump = false,
    prefixText,
    suffixText,
    label,
    children,
    className,
    ...props
  }) => {

  return (
    <button className={ clsx(
      'BlipButton',
      `BlipButton__size-${ size }`,
      !disableBump && 'BlipButton-bump',
      className
    ) }
            { ...props }
    >
      <span className="BlipButton__content">
        { prefixText ? <span className="BlipButton__content-prefix">{ prefixText }&nbsp;</span> : null }

        <span className="BlipButton__content-center">{ children || label || '' }</span>

        { suffixText ? <span className="BlipButton__content-suffix">&nbsp;{ suffixText }</span> : null }
      </span>

    </button>
  );
};
