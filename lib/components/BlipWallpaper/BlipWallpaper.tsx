import React from 'react';
import clsx from 'clsx';
import './BlipWallpaper.scss';

interface BlipWallpaperProps {
  children: React.ReactNode;
  show?: boolean;
}

export const BlipWallpaper: React.FC<BlipWallpaperProps> = ({ children, ...props }) => {

  const [ showOverlay, setShowOverlay ] = React.useState(!props?.show);

  React.useEffect(() => {
    setShowOverlay(!props?.show);
  }, [ props.show ]);

  return (
    <div className=" BlipWallpaper" { ...props } >
      <div className={ clsx(
        'BlipWallpaper__full',
        `BlipWallpaper--active`,
      ) }/>
      <div className={ clsx(
        'BlipWallpaper__full',
        'BlipWallpaper__overlay',
        showOverlay ? null : 'BlipWallpaper__overlay--hidden'
      ) }/>
      { children }
    </div>
  );
};
