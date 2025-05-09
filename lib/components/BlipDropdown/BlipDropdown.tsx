import React, { useEffect, useRef, useState } from 'react';
import './BlipDropdown.scss';
import clsx from 'clsx';
import { BlipButton } from '@lib';

export const BlipDropdown = (props: any) => {

  const [ isOpen, setIsOpen ] = useState<boolean>(false);
  const [ selectedOption, setSelectedOption ] = useState<any | null>(null);

  const dropdownRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleSelect = (option: any) => {
    if (props?.onChange) {
      props.onChange(option);
    }
    setSelectedOption(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const option = ( props?.options ?? [] ).find((o: any) => o.id === props?.value);
    if (option) {
      setSelectedOption(option);
    }
  }, [ props?.value, props?.options ]);

  return (
    <BlipButton disabled={ props?.disabled }
                suffix="+"
                disableBump
                ref={ dropdownRef }
                onClick={ handleToggle }
                size={ props?.size }
    >
      <div className="BlipDropdown-selected">
        { selectedOption ? selectedOption.label : 'Select an option' }
      </div>
      { isOpen && (
        <div className="BlipDropdown-options">
          { ( props?.options ?? [] ).map((option: any) => (
            <div
              key={ option.id }
              className={ clsx(
                'BlipDropdown-option',
                { 'BlipDropdown-option-selected': option.id === selectedOption?.id }
              ) }
              onClick={ () => handleSelect(option) }
            >
              { option.label }
            </div>
          )) }
        </div>
      ) }
    </BlipButton>
  );
};