import React, { useEffect, useState } from 'react';
import { BlipFileDropzone } from '@/lib';

const BlipFileDropzoneScaffold = (_props: any): React.ReactElement => {

  const [ props, setProps ] = useState<any>({});

  const handleClick = (e: any) => {
    if (_props?.onLogEvent) {
      _props.onLogEvent();
    }
  };

  useEffect(() => {
    setProps((prevState: any) => ( {
      ...prevState,
      ..._props?.defaultProps
    } ));
  }, [ _props?.defaultProps ]);

  return <BlipFileDropzone { ...props }
                           onClick={ handleClick }/>;

};

export default BlipFileDropzoneScaffold;
