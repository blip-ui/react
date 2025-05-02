import React, { useEffect, useState } from 'react';
import { BlipButton } from '@dist';

const BlipButtonScaffold = (_props: any): React.ReactElement => {

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

  return <BlipButton { ...props }
                     onClick={ handleClick }
  />;

};

export default BlipButtonScaffold;
