import React, { useEffect, useState } from 'react';
import { BlipFileDropzone } from '@lib';

const BlipFileDropzoneScaffold = (_props: any): React.ReactElement => {

  const [ props, setProps ] = useState<any>({});

  useEffect(() => {
    setProps((prevState: any) => ( {
      ...prevState,
      ..._props?.defaultProps
    } ));
  }, [ _props?.defaultProps ]);

  return <BlipFileDropzone { ...props } />;

};

export default BlipFileDropzoneScaffold;
