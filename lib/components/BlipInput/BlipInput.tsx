import React, { InputHTMLAttributes } from 'react';

import './BlipInput.scss';
import clsx from 'clsx';

type BlipInputProps = InputHTMLAttributes<HTMLInputElement> & {
  width?: string;
  onEditFinished?: (value: string) => void;
};

export const BlipInput: React.FC<BlipInputProps> = ({
                                                      width = 'auto',
                                                      className,
                                                      onEditFinished,
                                                      ...inputProps
                                                    }) => {

  const handleEditFinished = (value: any) => {
    if (onEditFinished) {
      onEditFinished(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      ( e.target as HTMLInputElement ).blur();
    }
  };

  return (
    <div className={ clsx(
      'BlipInput',
      'BlipInput__width-' + ( width ?? 'auto' ),
      className
    ) }>
      <input className="BlipInput__input"
             onBlur={ (e) => handleEditFinished(e.target.value) }
             onKeyDown={ handleKeyDown }
             { ...inputProps } />
    </div>
  );
};
