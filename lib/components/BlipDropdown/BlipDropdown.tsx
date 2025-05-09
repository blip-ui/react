import React, { useEffect, useRef, useState } from 'react';
import './BlipDropdown.scss';
import clsx from 'clsx';
import { BlipButton } from '@lib';

export const BlipDropdown = (props: any) => {
  const { size = 'auto', value, onChange, options = [] } = props;

  const [ isOpen, setIsOpen ] = useState<boolean>(false);
  const [ selectedOption, setSelectedOption ] = useState<any>(null);

  const dropdownRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleSelect = (option: any) => {
    setSelectedOption(option);
    onChange({ target: { value: option.id } });
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
    const option = options.find((o: any) => o.id === value);
    if (option) {
      setSelectedOption(option);
    }
  }, [ value, options ]);

  return (
    <BlipButton disabled={ props?.disabled }
                size="full"
                suffix="+"
                disableBump
                ref={ dropdownRef }
    >
      <div className="BlipDropdown-selected" onClick={ handleToggle }>
        { selectedOption ? selectedOption.label : 'Select an option' }
      </div>
      { isOpen && (
        <div className="BlipDropdown-options">
          { options.map((option: any) => (
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