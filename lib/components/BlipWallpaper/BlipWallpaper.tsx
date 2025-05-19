import React from 'react';
import clsx from 'clsx';
import './BlipWallpaper.scss';

interface BlipWallpaperProps {
  children: React.ReactNode;
  show?: boolean;
}

const BlipWallpaper: React.FC<BlipWallpaperProps> = ({ children, ...props }) => {

  const [ showOverlay, setShowOverlay ] = React.useState(!props?.show);

  React.useEffect(() => {
    setShowOverlay(!props?.show);
  }, [ props.show ]);

  return (
    <div className=" BlipWallpaper-container" { ...props }t>
      <div className={ clsx(
        'BlipWallpaper-full',
        `BlipWallpaper-mode-active`,
      ) }/>
      <div className={ clsx(
        'BlipWallpaper-full',
        'BlipWallpaper-overlay',
        showOverlay ? null : 'BlipWallpaper-overlay-hidden'
      ) }/>
      { children }
    </div>
  );
};

export default BlipWallpaper;