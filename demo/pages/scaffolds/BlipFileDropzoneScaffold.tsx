import React, { useEffect, useState } from 'react';
import { BlipFileDropzone } from '@lib';

const BlipFileDropzoneScaffold = (_props: any): React.ReactElement => {

  const [ props, setProps ] = useState<any>({});

  const handleFileLoaded = (e): void => {
    if (_props?.onLogEvent) {
      _props.onLogEvent(e);
    }
  };

  useEffect(() => {
    setProps((prevState: any) => ( {
      ...prevState,
      ..._props?.defaultProps
    } ));
  }, [ _props?.defaultProps ]);

  return <BlipFileDropzone { ...props }
                           onFileLoaded={ handleFileLoaded }
  />;

};

export default BlipFileDropzoneScaffold;
