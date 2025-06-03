import React from 'react';
import './BlipFrame.scss';
import clsx from 'clsx';

export interface BlipFrameProps {
  title?: string;
  className?: string;
  children: React.ReactNode;
}

export const BlipFrame: React.FC<BlipFrameProps> = ({ title, className, children }) => {
  return (
    <div className={ clsx('BlipFrame', className) }>
      <div className="BlipFrame__wrapper">
        <div className="BlipFrame__content__frame">
          { title && <div className="BlipFrame__title">{ title }</div> }
          <div className="BlipFrame__content">
            { children }
          </div>
        </div>
      </div>
    </div>
  );
};