import './BlipButton.scss';

import React, { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import clsx from 'clsx';

interface BlipButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  width?: 'auto' | string;
  disableBump?: boolean;
  prefixText?: React.ReactNode;
  suffixText?: React.ReactNode;
  label?: string | React.ReactNode;
}

export const BlipButton: React.FC<PropsWithChildren<BlipButtonProps>> = (
  {
    width = 'auto',
    disableBump = false,
    prefixText = null,
    suffixText = null,
    label,
    children,
    className,
    ...buttonProps
  }) => {

  return (
    <button
      className={ clsx(
        'BlipButton',
        `BlipButton__width-${ width }`,
        !disableBump && 'BlipButton-bump',
        className
      ) }
      { ...buttonProps }
    >
      <span className="BlipButton__content">
        { prefixText ? <span className="BlipButton__content-prefix">{ prefixText ?? null }&nbsp;</span> : null }

        <span className="BlipButton__content-center">{ children || label || '' }</span>

        { suffixText ? <span className="BlipButton__content-suffix">&nbsp;{ suffixText ?? null }</span> : null }
      </span>

    </button>
  );
};
