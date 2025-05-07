import React from 'react';
import './BlipThemeProvider.scss';
import clsx from 'clsx';

type Theme = 'basic' | 'inverted';

export const withBlipTheme = (Component: React.ComponentType<any>) => {
  return (props: any) => (
    <BlipThemeProvider>
      <Component { ...props } />
    </BlipThemeProvider>
  );
};

export const BlipThemeProvider = (props: any) => {
  const [ theme, setTheme ] = React.useState<Theme>(props?.theme ?? 'basic');

  return <div
    className={ clsx(
      'BlipThemeProvider',
      `BlipThemeProvider--${ theme }`
    ) }>
    { props?.children }
  </div>;
};
