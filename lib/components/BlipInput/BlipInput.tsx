import React, { InputHTMLAttributes } from 'react';

import './BlipInput.scss';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

type BlipInputProps = InputHTMLAttributes<HTMLInputElement> & {
  width?: string;
  clearable?: boolean;
  onEditFinished?: (value: string) => void;
  onClear?: () => void;
};

export const BlipInput: React.FC<BlipInputProps> = (
  {
    width = 'auto',
    className,
    onEditFinished,
    onClear,
    clearable = false,
    ...inputProps
  }) => {

  const handleClear = () => {
    if (onClear) {
      onClear();
    }
  };

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
      <input className={ clsx(
        'BlipInput__input',
        clearable ? 'BlipInput__input--clearable' : ''
      ) }
             onBlur={ (e) => handleEditFinished(e.target.value) }
             onKeyDown={ handleKeyDown }
             { ...inputProps } />
      { clearable && inputProps?.value ? (
        <span className="BlipInput__clear-icon"
              onClick={ handleClear } >
          <FontAwesomeIcon icon={ faTimes }/>
        </span>
      ) : null }
    </div>
  );
};
