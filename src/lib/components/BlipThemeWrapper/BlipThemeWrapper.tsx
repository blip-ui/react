import React from 'react';
import './BlipThemeWrapper.scss';

export const withBlipTheme = (Component: React.ComponentType<any>) => {
  return (props: any) => (
    <BlipThemeWrapper>
      <Component { ...props } />
    </BlipThemeWrapper>
  );
};

export const BlipThemeWrapper = (props: any) => {
  return <div className="BlipThemeWrapper">
    { props?.children }
  </div>;
};
