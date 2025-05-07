import React from 'react';
import './BlipThemeProvider.scss';
import clsx from 'clsx';

type Theme = 'basic' | 'inverted';

const getBodyTheme = (): Theme => {
  return ( document.body.getAttribute('data-blip-theme') as Theme ) || 'basic';
};

export const withBlipTheme = (Component: React.ComponentType<any>) => {
  return (props: any) => (
    <BlipThemeProvider>
      <Component { ...props } />
    </BlipThemeProvider>
  );
};

export const BlipThemeProvider = (props: any) => {
  const [ theme, setTheme ] = React.useState<Theme>(getBodyTheme());

  React.useEffect(() => {
    const updateTheme = () => {
      setTheme(getBodyTheme());
    };

    // Initial theme set
    updateTheme();

    // Set up a MutationObserver to watch for changes to the data-blip-theme attribute
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-blip-theme') {
          updateTheme();
        }
      });
    });

    observer.observe(document.body, { attributes: true, attributeFilter: [ 'data-blip-theme' ] });

    // Clean up the observer when the component unmounts
    return () => observer.disconnect();
  }, []);

  return <div
    className={ clsx(
      'BlipThemeWrapper',
      `BlipThemeWrapper--${ theme }`
    ) }>
    { props?.children }
  </div>;
};
