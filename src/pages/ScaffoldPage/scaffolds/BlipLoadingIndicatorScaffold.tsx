import React, { useEffect, useState } from 'react';
import { BlipLoadingIndicator } from '@dist';

const BlipLoadingIndicatorScaffold = (_props: any): React.ReactElement => {

  const [ props, setProps ] = useState<any>({});

  useEffect(() => {
    setProps((prevState: any) => ( {
      ...prevState,
      ..._props?.defaultProps
    } ));
  }, [ _props?.defaultProps ]);

  return <BlipLoadingIndicator { ...props } />;

};

export default BlipLoadingIndicatorScaffold;
