import React, { useEffect, useState } from 'react';
import BlipWallpaper from '../../../lib/components/BlipWallpaper/BlipWallpaper.tsx';

const BlipWallpaperScaffold = (_props: any): React.ReactElement => {

  const [ props, setProps ] = useState<any>({});

  useEffect(() => {
    setProps((prevState: any) => ( {
      ...prevState,
      ..._props?.defaultProps
    } ));
  }, [ _props?.defaultProps ]);

  return (
    <BlipWallpaper { ...props } />
  );

};

export default BlipWallpaperScaffold;
